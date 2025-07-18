import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Protect only dashboard routes
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (!userId && isProtectedRoute(req)) {
    const { redirectToSignIn } = await auth();
    return redirectToSignIn();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Match everything except static/public files (non-capturing groups used)
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:css|js|png|jpg|jpeg|svg|woff|woff2|ttf)).*)",
    "/",               // explicitly include root
    "/dashboard(.*)",  // your protected route
    "/(api|trpc)(.*)", // API routes
    "/mrlingo(.*)",    // other dynamic routes needing auth
  ],
};
