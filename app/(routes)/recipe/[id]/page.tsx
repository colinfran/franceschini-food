"use server"
import { getRecipe } from "@/db/getRecipe"
import React from "react"
import { v4 } from "uuid"
import { Ingredient, Instruction } from "@/types"
import { cookies } from "next/headers"
import MenuButton from "@/components/MenuButton"
import { urlify } from "@/lib/utils"
import Image from "next/image"
import { redirect } from "next/navigation"
type Props = { params: { id: never } }

const Page: React.FC<Props> = async ({ params }) => {
  const { recipe } = await getRecipe(params.id)
  if (!recipe) {
    redirect("/")
  }
  const authCookie = cookies().get("auth")?.value
  const {
    title,
    description,
    ingredients,
    instructions,
    cookingTime,
    servings,
    categories,
    image,
  } = recipe

  return (
    <section className="w-full py-12" style={{ overflowWrap: "anywhere" }}>
      <div className="container relative mx-auto grid gap-8 px-4 md:px-6">
        <div className="grid gap-2">
          <div className="flex flex-row justify-between">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            {authCookie && <MenuButton recipe={JSON.parse(JSON.stringify(recipe))} />}
          </div>
          <h2
            className="text-lg tracking-tight"
            dangerouslySetInnerHTML={{ __html: urlify(description) }}
          />
          <p className="text-gray-500 dark:text-gray-400">{`Cooking Time: ${cookingTime}`}</p>
          <p className="text-gray-500 dark:text-gray-400">{`Servings: ${servings}`}</p>
          <p className="text-gray-500 dark:text-gray-400">{`Categories: ${categories.join(", ")}`}</p>
        </div>
        <div className="w-full">
          <Image
            alt={title}
            className="h-auto w-full rounded-lg border border-gray-200 dark:border-gray-800"
            height={300}
            sizes="100vw"
            src={image}
            width={500}
          />
        </div>
        <div className="grid gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Ingredients</h2>
            <ul className="grid list-disc gap-4 pl-6 md:gap-2">
              {ingredients.map((ingredient: Ingredient) => (
                <li key={v4()}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Instructions</h2>
            <ol className="grid list-decimal gap-4 pl-6 md:gap-2">
              {instructions.map((instruction: Instruction) => (
                <li key={v4()}>{instruction}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Page
