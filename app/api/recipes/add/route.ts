import { addRecipes } from "@/db/addRecipes"
import { NextResponse } from "next/server"

/**
 * Handles the POST request to add a recipe
 * @route POST /api/recipes/add
 * @param {Request} request - The incoming HTTP request object.
 * @returns {Promise<NextResponse>} A promise that resolves to a Next.js response containing
 * the result of the database add operation.
 */

export const POST = async (request: Request): Promise<NextResponse> => {
  const { data } = await request.json()
  const result = await addRecipes(data)
  return NextResponse.json(result)
}
