import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher([
  '/admin',
  '/resources(.*)',
  '/security-journal',
]);

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname;

  // Do NOT apply Clerk to any API routes; allow API traffic unmodified
  if (pathname.startsWith('/api/')) {
    return;
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
