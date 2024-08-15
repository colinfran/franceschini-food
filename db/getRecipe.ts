import { Recipe } from "@/types"
import { MongoClient, ObjectId, WithId, Document } from "mongodb"
const uri = process.env.MONGODB_URI!

/**
 * Retrieves a recipe from the database.
 * @returns {Promise<{ recipes: WithId<Document>[] }>} A Promise that resolves to an object containing a recipe.
 */

export const getRecipe = async (id: string): Promise<{ recipe: Recipe | null }> => {
  const client = new MongoClient(uri)
  try {
    await client.connect()
    const db = client.db("recipe-app")
    const recipesCollection = db.collection<Recipe>("recipes")
    const recipe =  await recipesCollection.findOne({ id: id })
    return { recipe }
  } finally {
    await client.close()
  }
}
