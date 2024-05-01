// This file contains a context and provider for managing the currently selected recipe.
// It also provides a custom hook, useRecipe, for accessing the current recipe and a function to update it.
// The RecipeProvider wraps the content of the page in the root layout file.

"use client"
import { Recipe } from "@/types"
import { usePathname } from "next/navigation"
import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from "react"

type ContextProps = {
  currentRecipe: Recipe | undefined
  setCurrentRecipe: (val: Recipe | undefined) => void
}

const defaultContextValue: ContextProps = {
  currentRecipe: undefined,
  setCurrentRecipe: () => {},
}

const RecipeContext = createContext<ContextProps>(defaultContextValue)

export const RecipeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | undefined>(undefined)
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === "/") {
      setCurrentRecipe(undefined)
    }
  }, [pathname, setCurrentRecipe])
  return (
    <RecipeContext.Provider value={{ currentRecipe, setCurrentRecipe }}>
      {children}
    </RecipeContext.Provider>
  )
}

export const useRecipe = (): ContextProps => {
  return useContext(RecipeContext)
}
