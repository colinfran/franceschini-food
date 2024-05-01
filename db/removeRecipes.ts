import { ApiResponse, Recipe } from "@/types"
import { MongoClient } from "mongodb"
const uri = process.env.MONGODB_URI!

/**
 * Removes a recipe from the MongoDB database.
 * @param {Recipe} recipeData The data of the recipe to remove.
 * @returns {Promise<{ ApiResponse }>} A Promise that resolves with an ApiResponse indicating the result of the operation.
 */

export const removeRecipes = async (recipeData: Recipe): Promise<ApiResponse> => {
  const client = new MongoClient(uri)
  try {
    await client.connect()
    const db = client.db("recipe-app")
    const recipesCollection = db.collection("recipes")
    const result = await recipesCollection.deleteOne({ id: recipeData.id })
    if (result.deletedCount === 1) {
      return { success: true, message: "Recipe removed successfully" }
    } else {
      return { success: false, message: "Recipe not found or failed to remove" }
    }
  } finally {
    await client.close()
  }
}
