import { MongoClient, WithId, Document } from "mongodb"
const uri = process.env.MONGODB_URI!

/**
 * Retrieves all recipes from the database.
 * @returns {Promise<{ recipes: WithId<Document>[] }>} A Promise that resolves to an object containing an array of all recipes.
 */

export const getRecipes = async (): Promise<{ recipes: WithId<Document>[] }> => {
  const client = new MongoClient(uri)
  try {
    await client.connect()
    const db = client.db("recipe-app")
    const recipesCollection = db.collection("recipes")
    const recipes = await recipesCollection.find().toArray()
    return { recipes }
  } finally {
    await client.close()
  }
}
