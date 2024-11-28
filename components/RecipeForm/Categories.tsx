import React, { FC } from "react"
import { Badge } from "../ui/badge"
import { listOfCategories } from "@/lib/utils"
import { Recipe } from "@/types"

type Props = {
  recipeData: Recipe
  setRecipeData: (val: Recipe | ((prevState: Recipe) => Recipe)) => void
}

const Categories: FC<Props> = ({ recipeData, setRecipeData }) => {
  const handleCategoriesChange = (category: string): void => {
    const newData = { ...recipeData }
    if (newData.categories.includes(category)) {
      newData.categories = newData.categories.filter((cat: string) => cat !== category)
    } else {
      newData.categories = [...newData.categories, category]
    }
    setRecipeData(newData)
  }

  return (
    <div className="">
      <label
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        htmlFor="categories"
      >
        Categories
      </label>
      <div className="mt-1">
        <div className="scrollbar-custom flex flex-row gap-1 overflow-x-auto overflow-y-hidden pb-4">
          {listOfCategories.map((cat, index) => (
            <Badge
              className="text-center text-xxs"
              key={index}
              style={{
                backgroundColor: recipeData.categories.includes(cat) ? "gray" : "white",
                color: recipeData.categories.includes(cat) ? "white" : "black",
              }}
              variant="secondary"
              onClick={() => handleCategoriesChange(cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>
        <div className="my-0 text-xs">Selected Categories: {recipeData.categories.join(", ")}</div>
      </div>
    </div>
  )
}

export default Categories
