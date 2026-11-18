import { addRecipes } from "@/db/addRecipes"
import { isAuthenticated, unauthorizedResponse } from "@/lib/auth"
import { NextResponse } from "next/server"

/**
 * Handles the POST request to add a recipe. Requires a logged-in user.
 * @route POST /api/recipes/add
 * @param {Request} request - The incoming HTTP request object.
 * @returns {Promise<NextResponse>} A promise that resolves to a Next.js response containing
 * the result of the database add operation.
 */

export const POST = async (request: Request): Promise<NextResponse> => {
  if (!(await isAuthenticated())) return unauthorizedResponse()

  const { data } = await request.json()
  if (!data || typeof data !== "object" || typeof data.title !== "string" || !data.title.trim()) {
    return NextResponse.json({ success: false, message: "Invalid recipe" }, { status: 400 })
  }
  const result = await addRecipes(data)
  return NextResponse.json(result)
}
