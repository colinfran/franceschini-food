import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { getRecipes } from "@/db/getRecipes"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import Searchbar from "@/components/Searchbar"
import Filterbar from "@/components/Filterbar"

const Page: React.FC = async ({
  searchParams,
}: {
  searchParams?: {
    search?: string
    filter?: string
  }
}) => {
  const query = searchParams?.search || ""
  const filterList = searchParams?.filter || ""
  const { recipes } = await getRecipes()

  let recipeList = recipes
  if (query) {
    recipeList = recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(query.toLowerCase()) ||
        recipe.description.toLowerCase().includes(query.toLowerCase()),
    )
  }
  if (filterList) {
    const listOfFilters = decodeURIComponent(filterList).split(",")
    recipeList = recipeList.filter((recipe) =>
      listOfFilters.every((value) => recipe.categories.includes(value)),
    )
  }

  return (
    <div className="mb-20 mt-4 flex flex-col justify-center p-4">
      <div className="mx-auto mb-6 flex w-full max-w-screen-lg flex-col gap-2 md:flex-row">
        <Searchbar />
        <Filterbar />
      </div>
      {recipeList.length > 0 ? (
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
                      {description.length > 100
                        ? description.substring(0, 100) + "..."
                        : description}
                    </CardDescription>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="m-auto w-full max-w-screen-lg">
          <Card className="relative flex h-32 min-h-full w-full items-center justify-center break-words">
            <CardTitle>No results found</CardTitle>
          </Card>
        </div>
      )}
    </div>
  )
}

export default Page
