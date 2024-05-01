"use client"
import React, { FC } from "react"
import RecipeForm from "@/components/RecipeForm"
import { defaultRecipe } from "@/lib/utils"

const Page: FC = () => {
  const pageTitle = "Add Recipe"
  const pageDescription = "Fill out the form below to add a new recipe to your collection."
  const fetchUrl = "/api/recipes/add"
  const successRoute = "/?added=true"
  return (
    <RecipeForm
      currentRecipe={defaultRecipe}
      fetchUrl={fetchUrl}
      pageDescription={pageDescription}
      pageTitle={pageTitle}
      successRoute={successRoute}
    />
  )
}
export default Page
