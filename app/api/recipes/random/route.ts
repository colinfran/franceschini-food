import { getRecipes } from "@/db/getRecipes"
import { NextRequest, NextResponse } from "next/server"

/**
 * Handles GET requests to the random recipe endpoint.
 * @route POST /api/recipes/random
 * @returns {NextResponse} A Next.js redirect to the random recipe endpoint.
 */

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  const { recipes } = await getRecipes()
  const randomIndex = Math.floor(Math.random() * recipes.length)
  const recipeId = recipes[randomIndex].id
  const url = new URL(`/recipe/${recipeId}`, request.url)
  return NextResponse.redirect(url, { status: 307 })
}
