import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { getRecipes } from "@/db/getRecipes"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import Searchbar from "@/components/Searchbar"

const Page: React.FC = async ({
  searchParams,
}: {
  searchParams?: {
    search?: string
    page?: string
  }
}) => {
  const query = searchParams?.search || ""
  const { recipes } = await getRecipes()

  const recipeList = recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(query.toLowerCase()) ||
      recipe.description.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="mb-20 mt-4 flex flex-col justify-center p-4">
      <div className="mx-auto mb-6 w-full max-w-screen-lg">
        <Searchbar />
      </div>
      <div className="mx-auto grid w-full max-w-screen-lg grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recipeList?.map(({ title, description, id, image }) => (
          <Link href={`/recipe/${id}`} key={id}>
            <Card className="relative min-h-full break-words">
              <CardContent className="p-0">
                <Image
                  alt={title}
                  className="h-48 w-full rounded-t-md object-cover"
                  height={400}
                  src={image}
                  style={{
                    aspectRatio: "600/400",
                    objectFit: "cover",
                  }}
                  width={600}
                  priority
                />
                <div className="h-48 overflow-hidden p-6">
                  <CardTitle>{title}</CardTitle>
                  <CardDescription className="mt-1">
                    {description.length > 100 ? description.substring(0, 100) + "..." : description}
                  </CardDescription>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Page
