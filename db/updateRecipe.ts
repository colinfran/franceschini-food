import { buildId } from "@/lib/utils"
import { ApiResponse, Recipe } from "@/types"
import { MongoClient, ObjectId } from "mongodb"
const uri = process.env.MONGODB_URI!

/**
 * Updates a recipe in the MongoDB database.
 * @param {Recipe} obj The updated data of the recipe.
 * @returns {Promise<{ ApiResponse }>} A Promise that resolves with an ApiResponse indicating the result of the operation.
 */

export const updateRecipe = async (obj: Recipe): Promise<ApiResponse> => {
  const client = new MongoClient(uri)
  try {
    await client.connect()
    const db = client.db("recipe-app")
    const recipesCollection = db.collection("recipes")
    const { _id, ...updateData } = obj
    let val = 0
    let id = buildId(updateData.title, val)
    const existingRecipe = await recipesCollection.findOne({ _id: new ObjectId(_id) })

    if (
      existingRecipe?.title !== updateData.title &&
      (await recipesCollection.findOne({ id: id }))
    ) {
      val = 1
      let tempId = buildId(updateData.title, val)
      while (await recipesCollection.findOne({ id: tempId })) {
        val++
        tempId = buildId(updateData.title, val)
      }
      id = tempId
    }

    updateData.id = id
    updateData.image =
      updateData.image || "https://i.ibb.co/hffZ9t6/927f441f93304c66bc230186ea3af89f.jpg"
    const result = await recipesCollection.updateOne(
      { _id: new ObjectId(obj._id) },
      { $set: { ...updateData } },
    )
    if (result) {
      return { success: true, message: "Recipe edited successfully" }
    } else {
      return { success: false, message: "Recipe not found or failed to edit" }
    }
  } finally {
    await client.close()
  }
}
