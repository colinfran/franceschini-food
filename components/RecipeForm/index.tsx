"use client"
import React, { FC, Suspense, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { useRouter } from "next/navigation"
import { Recipe } from "@/types"
import { useRecipe } from "@/providers/recipe-provider"
import Ingredients from "./Ingredients"
import Instructions from "./Instructions"
import Categories from "./Categories"
import ImageUpload from "./ImageUpload"
import Title from "./Title"
import Description from "./Description"
import ServingsCookTime from "./ServingsCookTime"

type Props = {
  currentRecipe: Recipe
  pageTitle: string
  pageDescription: string
  fetchUrl: string
  successRoute: string
}

const RecipeForm: FC<Props> = ({
  currentRecipe,
  pageTitle,
  pageDescription,
  fetchUrl,
  successRoute,
}) => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const { setCurrentRecipe } = useRecipe()

  useEffect(() => {
    if (pageTitle === "Edit Recipe" && currentRecipe._id === "") {
      router.push("/")
    }
  }, [currentRecipe, pageTitle, router])

  const [imagePreview, setImagePreview] = useState<string | undefined | null>(
    currentRecipe?.image || undefined,
  )

  const [recipeData, setRecipeData] = useState<Recipe>(currentRecipe)

  const handleSubmit = async (): Promise<void> => {
    setLoading(true)
    const object = recipeData
    if (imagePreview) {
      object.image = imagePreview
    }
    try {
      const response = await fetch(fetchUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: object }),
      })
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const responseData = await response.json()
      if (responseData.success) {
        setLoading(false)
        setCurrentRecipe(undefined)
        router.push(successRoute)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target
    setRecipeData((prevState: Recipe) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <Suspense>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
              {pageTitle}
            </h1>
            <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">{pageDescription}</p>
          </div>
          <div className="space-y-6">
            <div className="flex flex-col gap-4">
              <Title handleChange={handleChange} recipeData={recipeData} />
              <Description handleChange={handleChange} recipeData={recipeData} />
              <ServingsCookTime handleChange={handleChange} recipeData={recipeData} />
              <Ingredients recipeData={recipeData} setRecipeData={setRecipeData} />
              <Instructions recipeData={recipeData} setRecipeData={setRecipeData} />
              <Categories recipeData={recipeData} setRecipeData={setRecipeData} />
              <ImageUpload imagePreview={imagePreview} setImagePreview={setImagePreview} />
            </div>
            <div className="flex justify-end">
              <Button
                className="w-full"
                disabled={
                  loading ||
                  !(
                    recipeData.title.length > 1 ||
                    recipeData.description.length > 1 ||
                    recipeData.servings > 0 ||
                    recipeData.cookingTime > 0 ||
                    recipeData.ingredients[0] !== "" ||
                    recipeData.instructions[0] !== "" ||
                    recipeData.categories.length > 0
                  )
                }
                variant="secondary"
                onClick={handleSubmit}
              >
                {loading ? <LoadingSpinner /> : "Save Recipe"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export default RecipeForm
