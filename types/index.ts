export interface Recipes {
  recipes: Recipe[]
}

export interface Recipe {
  _id: string
  id: string
  title: string
  description: string
  ingredients: Ingredient[]
  instructions: Instruction[]
  cookingTime: number
  servings: number
  categories: string[]
  image: string
}

export type Ingredient = string

export type Instruction = string

export type ApiResponse = {
  message: string
  success: boolean
}
