import { clerkMiddleware, createRouteMatcher, getAuth } from "@clerk/nextjs/server";
import { isAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher([
  '/admin',
  '/resources(.*)',
  '/projects',
  '/security-journal',
]);

export default clerkMiddleware(async (auth, req) => {
  // Skip Clerk middleware effects for Arcjet test endpoint
  // This avoids dev-browser handshakes on API calls and lets Arcjet receive requests
  if (req.nextUrl.pathname.startsWith('/api/arcjet')) {
    return NextResponse.next();
  }

  if (isProtectedRoute(req)) await auth.protect()
})




export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes, but explicitly exclude Arcjet endpoint from Clerk
    '/api/(?!arcjet).*',
    '/trpc(.*)',
  ],
};