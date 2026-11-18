import { removeRecipes } from "@/db/removeRecipes"
import { isAuthenticated, unauthorizedResponse } from "@/lib/auth"
import { NextResponse } from "next/server"

/**
 * Handles the POST request to remove a recipe. Requires a logged-in user.
 * @route POST /api/recipes/remove
 * @param {Request} request - The incoming HTTP request object.
 * @returns {Promise<NextResponse>} A promise that resolves to Next.js response containing
 * the result of the database removal operation.
 */

export const POST = async (request: Request): Promise<NextResponse> => {
  if (!(await isAuthenticated())) return unauthorizedResponse()

  const { data } = await request.json()
  // id must be a plain string: an object such as { $ne: null } would match any recipe
  if (!data || typeof data.id !== "string" || !data.id) {
    return NextResponse.json({ success: false, message: "Invalid recipe id" }, { status: 400 })
  }
  const result = await removeRecipes(data)
  return NextResponse.json(result)
}
