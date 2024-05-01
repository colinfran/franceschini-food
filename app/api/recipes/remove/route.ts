import { removeRecipes } from "@/db/removeRecipes"
import { NextResponse } from "next/server"

/**
 * Handles the POST request to remove a recipe
 * @route POST /api/recipes/remove
 * @param {Request} request - The incoming HTTP request object.
 * @returns {Promise<NextResponse>} A promise that resolves to Next.js response containing
 * the result of the database removal operation.
 */

export const POST = async (request: Request): Promise<NextResponse> => {
  const { data } = await request.json()
  const result = await removeRecipes(data)
  return NextResponse.json(result)
}
