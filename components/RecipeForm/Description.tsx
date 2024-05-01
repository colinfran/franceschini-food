import React, { FC } from "react"
import { Textarea } from "../ui/textarea"
import { Recipe } from "@/types"

type Props = {
  recipeData: Recipe
  handleChange: (ve: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const Description: FC<Props> = ({ recipeData, handleChange }) => (
  <div className="">
    <label
      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      htmlFor="description"
    >
      Recipe Description
    </label>
    <div className="mt-1">
      <Textarea
        id="description"
        name="description"
        placeholder="e.g. Classic Italian pasta dish with bacon, eggs, and Parmesan cheese."
        value={recipeData.description}
        onChange={handleChange}
      />
    </div>
  </div>
)

export default Description
