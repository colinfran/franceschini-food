import { updateRecipe } from "@/db/updateRecipe"
import { isAuthenticated, unauthorizedResponse } from "@/lib/auth"
import { ObjectId } from "mongodb"
import { NextResponse } from "next/server"

/**
 * Handles the POST request to update a recipe. Requires a logged-in user.
 * @route POST /api/recipes/update
 * @param {Request} request - The incoming HTTP request object.
 * @returns {Promise<NextResponse>} A promise that resolves to Next.js response containing
 * the result of the database update operation.
 */

export const POST = async (request: Request): Promise<NextResponse> => {
  if (!(await isAuthenticated())) return unauthorizedResponse()

  const { data } = await request.json()
  if (
    !data ||
    typeof data._id !== "string" ||
    !ObjectId.isValid(data._id) ||
    typeof data.title !== "string" ||
    !data.title.trim()
  ) {
    return NextResponse.json({ success: false, message: "Invalid recipe" }, { status: 400 })
  }
  const result = await updateRecipe(data)
  return NextResponse.json(result)
}
