import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import arcjet, { rateLimit, detectBot, shield } from "@arcjet/next";

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher([
  '/admin',
  '/resources(.*)',
  '/security-journal',
]);

// Initialize Arcjet with required rules (global protection)
const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    rateLimit({ mode: "LIVE", limit: 100, interval: "1m" }),
    detectBot(),
    shield(),
  ],
});

export default clerkMiddleware(async (auth, req) => {
  // Arcjet protection runs for all matched requests
  const decision = await aj.protect(req);
  if (decision.isDenied()) {
    return NextResponse.json({ error: "Blocked by Arcjet" }, { status: 403 });
  }

  const pathname = req.nextUrl.pathname;

  // Do NOT apply Clerk to any API routes; allow API traffic unmodified
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Apply Clerk auth to protected page routes only
  if (isProtectedRoute(req)) await auth.protect();
})




export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Include API routes so Arcjet runs globally (Clerk is skipped in code for APIs)
    '/(api|trpc)(.*)',
  ],
};