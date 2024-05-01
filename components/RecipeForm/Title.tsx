import React, { FC } from "react"
import { Input } from "../ui/input"
import { Recipe } from "@/types"

type Props = {
  recipeData: Recipe
  handleChange: (ve: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const Title: FC<Props> = ({ recipeData, handleChange }) => (
  <div className="">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="title">
      Recipe Name
    </label>
    <div className="mt-1">
      <Input
        id="title"
        name="title"
        placeholder="e.g. Grandma's Homemade Lasagna"
        type="text"
        value={recipeData.title}
        onChange={handleChange}
      />
    </div>
  </div>
)

export default Title
