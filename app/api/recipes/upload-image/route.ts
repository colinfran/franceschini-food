import { NextResponse } from "next/server"
import { v4 } from "uuid"
const key = process.env.IMGBB_KEY!

/**
 * Handles the POST request to upload an image for a recipe
 * @route POST /api/recipes/upload-image
 * @param {Request} request - The incoming HTTP request object.
 * @returns {Promise<NextResponse>} A promise that resolves to Next.js response containing
 * the result url of the uploaded image
 */

export const POST = async (request: Request): Promise<NextResponse> => {
  const name = v4().replaceAll("-", "")
  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${key}&name=${name}`, {
      method: "POST",
      body: await request.formData(),
    })
    if (!response.ok) {
      throw new Error("Image upload failed")
    }
    const val = await response.json()
    return NextResponse.json({ url: val.data.url })
  } catch (e) {
    console.error(e)
  }
  return NextResponse.json({ success: false, message: "Error uploading image." })
}
