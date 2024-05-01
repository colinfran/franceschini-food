import React, { FC } from "react"
import { Input } from "../ui/input"
import { Recipe } from "@/types"

type Props = {
  recipeData: Recipe
  handleChange: (ve: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const ServingsCookTime: FC<Props> = ({ recipeData, handleChange }) => (
  <div className="flex flex-row justify-evenly gap-4">
    <div className="">
      <label
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        htmlFor="servings"
      >
        Servings
      </label>
      <div className="mt-1">
        <Input
          id="servings"
          min={0}
          name="servings"
          placeholder="4"
          type="number"
          value={recipeData.servings}
          onChange={handleChange}
        />
      </div>
    </div>
    <div className="">
      <label
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        htmlFor="cookingTime"
      >
        Cook Time
      </label>
      <div className="mt-1">
        <Input
          id="cookingTime"
          min={0}
          name="cookingTime"
          placeholder="60"
          type="number"
          value={recipeData.cookingTime}
          onChange={handleChange}
        />
      </div>
    </div>
  </div>
)

export default ServingsCookTime
