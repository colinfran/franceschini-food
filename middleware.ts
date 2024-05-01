import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
const jwtSecret = process.env.JWT_SECRET!

/**
 * Middleware function to verify JWT token in request cookies.
 * Redirects to homepage if token is invalid or missing.
 * @param {NextRequest} request - The Next.js request object.
 * @returns {Promise<NextResponse>} - The Next.js response object.
 */

export const middleware = async (request: NextRequest): Promise<NextResponse> => {
  const jwt = request.cookies.get('auth')
  if (jwt){
    if (request.nextUrl.pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    try {
      await jwtVerify(
        jwt.value,
        new TextEncoder().encode(jwtSecret)
      );
      return NextResponse.next();
    } catch (error) {
      const response = NextResponse.redirect(new URL('/', request.url))
      response.cookies.set({
        name: "auth",
        value: "",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: -1,
        path: "/",
      });
      return response;
    }
  } else {
    if (request.nextUrl.pathname.startsWith('/add') || request.nextUrl.pathname.startsWith('/edit')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  return NextResponse.next();
}