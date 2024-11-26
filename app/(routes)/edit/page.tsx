"use client"
import React, { FC, Suspense } from "react"
import RecipeForm from "@/components/RecipeForm"
import { useRecipe } from "@/providers/recipe-provider"
import { defaultRecipe } from "@/lib/utils"

const PageContent: FC = () => {
  const pageTitle = "Edit Recipe"
  const pageDescription = "Fill out the form below to edit the recipe."
  const fetchUrl = "/api/recipes/update"
  const { currentRecipe } = useRecipe()
  return (
    <RecipeForm
      currentRecipe={currentRecipe || defaultRecipe}
      fetchUrl={fetchUrl}
      pageDescription={pageDescription}
      pageTitle={pageTitle}
    />
  )
}

const Page: FC = () => {
  return (
    <Suspense>
      <PageContent />
    </Suspense>
  )
}

export default Page
