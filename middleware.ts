import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/next";

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
    shield({ mode: "LIVE" }),
    detectBot({ mode: "LIVE" }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 100, // tokens added per interval
      interval: 60,    // seconds per interval (1 minute)
      capacity: 100,   // max tokens (burst capacity)
    }),
  ],
});

export default clerkMiddleware(async (auth, req) => {
  // Arcjet protection runs for all matched requests
  const decision = await aj.protect(req, { requested: 1 });
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