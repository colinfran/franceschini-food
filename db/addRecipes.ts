import { buildId } from "@/lib/utils"
import { ApiResponse, Recipe } from "@/types"
import { MongoClient, ObjectId } from "mongodb"

const uri = process.env.MONGODB_URI!

/**
 * Adds a recipe to the MongoDB database.
 * @param {Recipe} recipeData The data of the recipe to add.
 * @returns {Promise<{ ApiResponse }>} A Promise that resolves with an ApiResponse indicating the result of the operation.
 */
export const addRecipes = async (recipeData: Recipe): Promise<ApiResponse> => {
  const client = new MongoClient(uri)
  try {
    await client.connect()
    const db = client.db("recipe-app")
    const recipesCollection = db.collection("recipes")
    let val = 0
    let id = buildId(recipeData.title, val)
    let existingRecipe = await recipesCollection.findOne({ id: id })
    while (existingRecipe) {
      val += 1
      id = buildId(recipeData.title, val)
      existingRecipe = await recipesCollection.findOne({ id: id })
    }
    const result = await recipesCollection.insertOne({
      ...recipeData,
      _id: new ObjectId(),
      id,
      image: recipeData.image || "https://i.ibb.co/hffZ9t6/927f441f93304c66bc230186ea3af89f.jpg",
    })
    if (result.acknowledged) {
      return { success: true, message: "Recipe added successfully" }
    } else {
      return { success: false, message: "Failed to add recipe" }
    }
  } finally {
    await client.close()
  }
}
