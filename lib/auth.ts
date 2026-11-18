import { jwtVerify } from "jose"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { checkBotId } from "botid/server"

const jwtSecret = process.env.JWT_SECRET!

/**
 * Checks whether the request has a valid, unexpired login token in the "auth" cookie.
 * API routes that change data must call this; the middleware only redirects pages.
 * @returns {Promise<boolean>} True if the "auth" cookie holds a JWT signed with JWT_SECRET.
 */
export const isAuthenticated = async (): Promise<boolean> => {
  const token = cookies().get("auth")?.value
  if (!token) return false
  try {
    await jwtVerify(token, new TextEncoder().encode(jwtSecret), { algorithms: ["HS256"] })
    return true
  } catch {
    return false
  }
}

/**
 * Response for API routes that require a logged-in user.
 * @returns {NextResponse} A 401 JSON response.
 */
export const unauthorizedResponse = (): NextResponse =>
  NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })

/**
 * Runs a Vercel BotID check on the current request. Only call this from routes listed in
 * botIdProtectedRoutes in app/layout.tsx, or every request will be treated as a bot.
 * Fails open: if the check itself errors, the request is allowed so login keeps working.
 * Always returns null in local development.
 * @returns {Promise<NextResponse | null>} A 403 response if the request came from a bot, otherwise null.
 */
export const rejectBots = async (): Promise<NextResponse | null> => {
  try {
    const { isBot } = await checkBotId()
    if (isBot) return NextResponse.json({ valid: false, message: "Access denied" }, { status: 403 })
  } catch (error) {
    console.error("BotID check failed, allowing request:", error)
  }
  return null
}
