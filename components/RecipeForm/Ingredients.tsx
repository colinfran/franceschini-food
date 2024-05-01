import React, { FC } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Recipe } from "@/types"

type Props = {
  recipeData: Recipe
  setRecipeData: (val: Recipe | ((prevState: Recipe) => Recipe)) => void
}

const Ingredients: FC<Props> = ({ recipeData, setRecipeData }) => {
  const handleAddIngredient = (): void => {
    const newData = { ...recipeData }
    newData.ingredients = [...newData.ingredients, ""]
    setRecipeData(newData)
  }

  const handleDeleteIngredient = (index: number): void => {
    const newData = { ...recipeData }
    const newIngredients = [...newData.ingredients]
    newIngredients.splice(index, 1)
    newData.ingredients = newIngredients
    setRecipeData(newData)
  }

  const handleIngredientChange = (index: number, e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    setRecipeData((prevState: Recipe) => {
      const newIngredients = [...prevState.ingredients]
      newIngredients[index] = value
      return { ...prevState, ingredients: newIngredients }
    })
  }

  return (
    <div className="">
      <label
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        htmlFor="ingredients"
      >
        Ingredients
      </label>
      <div className="mt-1 space-y-4">
        <div className="flex flex-col gap-2">
          <Button className="w-full" type="button" onClick={handleAddIngredient}>
            <svg
              aria-hidden="true"
              className="-ml-1 mr-2 size-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                fillRule="evenodd"
              />
            </svg>
            Add Ingredient
          </Button>
          {recipeData.ingredients.map((ingredient: string, index: number) => (
            <div className="flex flex-row gap-2" key={index}>
              <Input
                id={`ingredients-${index}`}
                name={`ingredients-${index}`}
                placeholder="1 lb ground beef"
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e)}
              />
              {index !== 0 && (
                <Button variant="outline" onClick={() => handleDeleteIngredient(index)}>
                  <svg
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line x1="18" x2="6" y1="6" y2="18"></line>
                    <line x1="6" x2="18" y1="6" y2="18"></line>
                  </svg>
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Ingredients
