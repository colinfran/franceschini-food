import { Recipe } from "@/types"
import { MongoClient } from "mongodb"
const uri = process.env.MONGODB_URI!

/**
 * Retrieves a random recipe from the database.
 * @returns {Promise<{ recipe: Recipe }>} A Promise that resolves to an object containing a random recipe.
 */

export const getRandomRecipe = async (): Promise<{ recipe: Recipe }> => {
  const client = new MongoClient(uri)
  try {
    await client.connect()
    const db = client.db("recipe-app")
    const recipesCollection = db.collection<Recipe>("recipes")
    const randomRecipe = await recipesCollection.aggregate<Recipe>([{ $sample: { size: 1 } }]).toArray()
    return { recipe: randomRecipe[0] }
  } finally {
    await client.close()
  }
}
