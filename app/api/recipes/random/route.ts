import { getRandomRecipe } from "@/db/getRandomRecipe"
import { NextRequest, NextResponse } from "next/server"

/**
 * Handles GET requests to the random recipe endpoint.
 * @route POST /api/recipes/random
 * @returns {NextResponse} A Next.js redirect to the random recipe endpoint.
 */

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  const { recipe } = await getRandomRecipe()
  const recipeId = recipe.id
  const url = new URL(`/recipe/${recipeId}`, request.url)
  return NextResponse.redirect(url, { status: 307 })
}
