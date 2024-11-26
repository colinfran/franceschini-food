import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines class names using clsx and tailwind-merge to generate a single string of classNames.
 * Simplifies the process of conditional class application in React components.
 * @param {...ClassValue[]} inputs Class names to be combined.
 * @returns {string} A string of combined classNames.
 */
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs))
}

/**
 * Builds a unique ID for a recipe based on its title and a numerical suffix.
 * @param {string} str The title of the recipe.
 * @param {number} num The numerical suffix.
 * @returns {string} The unique ID generated for the recipe.
 */
export const buildId = (str: string, num: number): string => {
  const lowercaseStr = str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9-_.~]/g, "")
  if (num === 0) return lowercaseStr
  const result = lowercaseStr + `-${num}`
  return result
}

// Used in the category picker within the app
export const listOfCategories = [
  "American",
  "Appetizer",
  "Argentinian",
  "Asian",
  "BBQ",
  "Baked",
  "Barbecue",
  "Beverage",
  "Bread",
  "Breakfast",
  "British",
  "Burger",
  "Burrito",
  "Cajun",
  "Caribbean",
  "Chinese",
  "Comfort Food",
  "Dessert",
  "Dinner",
  "French",
  "Fried",
  "German",
  "Grains",
  "Greek",
  "Grilled",
  "Indian",
  "Italian",
  "Japanese",
  "Korean",
  "Latin American",
  "Lunch",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Noodle",
  "Pasta",
  "Pastry",
  "Pizza",
  "Roasted",
  "Salads",
  "Sandwich",
  "Seafood",
  "Smoothie",
  "Soup",
  "Spanish",
  "Steak",
  "Stir-fry",
  "Sushi",
  "Sweets",
  "Taco",
  "Thai",
  "Vegetarian",
  "Vegan",
  "Vietnamese",
  "Western",
  "Wrap",
]

// Default form values for adding a recipe
export const defaultRecipe = {
  id: "",
  _id: "",
  title: "",
  description: "",
  cookingTime: 0,
  servings: 0,
  ingredients: [""],
  instructions: [""],
  categories: [],
  image: "",
}

/**
 * Converts URLs within a text into clickable links.
 * @param {string} text - The input text containing URLs.
 * @returns {string} - The text with URLs converted into clickable links.
 */
export const urlify = (text: string): string => {
  const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g
  return text.replace(urlRegex, (url, b, c) => {
    const url2 = c == "www." ? "http://" + url : url
    return `<a style='color: rgb(161 161 170); text-decoration:underline;' href='${url2}' target='_blank'>${url}</a>`
  })
}
