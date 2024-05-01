import { updateRecipe } from "@/db/updateRecipe"
import { NextResponse } from "next/server"

/**
 * Handles the POST request to update a recipe
 * @route POST /api/recipes/update
 * @param {Request} request - The incoming HTTP request object.
 * @returns {Promise<NextResponse>} A promise that resolves to Next.js response containing
 * the result of the database update operation.
 */

export const POST = async (request: Request): Promise<NextResponse> => {
  const { data } = await request.json()
  const result = await updateRecipe(data)
  return NextResponse.json(result)
}
