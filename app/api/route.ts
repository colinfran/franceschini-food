import { NextResponse } from "next/server"

/**
 * Handles GET requests to the root API endpoint.
 * @route POST /api/
 * @returns {NextResponse} A Next.js response object containing a JSON payload with a welcome message.
 */

export const GET = async (): Promise<NextResponse> => {
  return NextResponse.json({ status: 200, message: "Welcome to the https://franceschini.food API" })
}
