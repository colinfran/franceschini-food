import { createHash, timingSafeEqual } from "crypto"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { sign } from "jsonwebtoken"
import { rejectBots } from "@/lib/auth"

const loginKey = process.env.LOGIN_KEY!
const jwtSecret = process.env.JWT_SECRET!
const THIRTY_DAYS_IN_SECONDS = 60 * 60 * 24 * 30

/**
 * Compares two strings in constant time, so response timing doesn't reveal how much of
 * the key was right. Hashing first makes both inputs the same length.
 * @param {string} a - The submitted key.
 * @param {string} b - The real key.
 * @returns {boolean} True if the strings are equal.
 */
const safeEqual = (a: string, b: string): boolean => {
  const hashA = createHash("sha256").update(a).digest()
  const hashB = createHash("sha256").update(b).digest()
  return timingSafeEqual(
    new Uint8Array(hashA) as Uint8Array<ArrayBuffer>,
    new Uint8Array(hashB) as Uint8Array<ArrayBuffer>,
  )
}

/**
 * Handles the POST request to authenticate a user and generate a JWT token.
 * @route POST /api/login
 * @param {Request} request - The incoming HTTP request object containing the login key.
 * @returns {Promise<NextResponse>} - A promise that resolves to a Next.js response indicating the authentication status.
 */

export const POST = async (request: Request): Promise<NextResponse> => {
  const botResponse = await rejectBots()
  if (botResponse) return botResponse

  const { key } = await request.json()
  if (typeof key !== "string" || !safeEqual(key, loginKey)) {
    return NextResponse.json({ valid: false })
  }
  const token = await sign(
    {
      exp: Math.floor(Date.now() / 1000) + THIRTY_DAYS_IN_SECONDS,
    },
    jwtSecret,
  )

  cookies().set({
    name: "auth",
    value: token,
    // Not readable from page JavaScript; the header and pages read it on the server.
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    // maxAge is in seconds (it was set in milliseconds, i.e. ~82 years).
    maxAge: THIRTY_DAYS_IN_SECONDS,
    path: "/",
  })
  return NextResponse.json({ valid: true })
}
