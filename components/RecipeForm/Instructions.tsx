import React, { FC } from "react"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { Recipe } from "@/types"

type Props = {
  recipeData: Recipe
  setRecipeData: (val: Recipe | ((prevState: Recipe) => Recipe)) => void
}

const Instructions: FC<Props> = ({ recipeData, setRecipeData }) => {
  const handleAddInstruction = (): void => {
    const newData = { ...recipeData }
    newData.instructions = [...newData.instructions, ""]
    setRecipeData(newData)
  }

  const handleDeleteInstruction = (index: number): void => {
    const newData = { ...recipeData }
    const newInstructions = [...newData.instructions]
    newInstructions.splice(index, 1)
    newData.instructions = newInstructions
    setRecipeData(newData)
  }

  const handleInstructionChange = (
    index: number,
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    const { value } = e.target
    setRecipeData((prevState: Recipe) => {
      const newInstructions = [...prevState.instructions]
      newInstructions[index] = value
      return { ...prevState, instructions: newInstructions }
    })
  }

  return (
    <div className="">
      <label
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        htmlFor="instructions"
      >
        Instructions
      </label>
      <div className="mt-1 space-y-4">
        <div className="flex flex-col gap-2">
          <Button className="w-full" type="button" onClick={handleAddInstruction}>
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
            Add Instruction
          </Button>
          {recipeData.instructions.map((instruction: string, index: number) => (
            <div className="flex flex-row gap-2" key={index}>
              <Textarea
                id={`instructions-${index}`}
                name={`instructions-${index}`}
                placeholder={`${index + 1}. Preheat oven to 375°F.`}
                rows={3}
                value={instruction}
                onChange={(e) => handleInstructionChange(index, e)}
              />
              {index !== 0 && (
                <Button variant="outline" onClick={() => handleDeleteInstruction(index)}>
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

export default Instructions
