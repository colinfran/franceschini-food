import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { sign } from "jsonwebtoken"

const loginKey = process.env.LOGIN_KEY!
const jwtSecret = process.env.JWT_SECRET!

/**
 * Handles the POST request to authenticate a user and generate a JWT token.
 * @route POST /api/login
 * @param {Request} request - The incoming HTTP request object containing the login key.
 * @returns {Promise<NextResponse>} - A promise that resolves to a Next.js response indicating the authentication status.
 */

export const POST = async (request: Request): Promise<NextResponse> => {
  const { key } = await request.json()
  if (key !== loginKey) {
    return NextResponse.json({ valid: false })
  }
  const token = await sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
    },
    jwtSecret,
  )

  cookies().set({
    name: "auth",
    value: token,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 30,
    path: "/",
  })
  return NextResponse.json({ valid: true })
}
