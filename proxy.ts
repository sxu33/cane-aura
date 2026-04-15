import { auth } from "@/auth";
import { NextResponse } from "next/server";

// Define route categories for access control
const guestPaths = ["/sign-in", "/sign-up", "/forgot-password"];
const protectedPaths = ["/shipping", "/admin", "/profile"];

export const proxy = auth((req) => {
  const { pathname, searchParams } = req.nextUrl;
  console.log(pathname, searchParams);

  // 1. Determine authentication state
  // Check if session exists via Auth.js injected auth object
  const isLoggedIn = !!req.auth?.user;

  // 2. Scenario A: Unauthenticated access to protected routes
  // Intercept users trying to reach private areas without a valid session
  if (!isLoggedIn && protectedPaths.some((path) => pathname.startsWith(path))) {
    const signInUrl = new URL("/sign-in", req.nextUrl);
    console.log(signInUrl);

    // Persist current location as a callback for post-login redirection
    signInUrl.searchParams.set("callbackUrl", pathname);
    console.log(signInUrl);
    return NextResponse.redirect(signInUrl);
  }

  // 3. Scenario B: Authenticated users accessing guest-only routes
  // Redirect logged-in users away from auth pages (Sign In/Up)
  if (isLoggedIn && guestPaths.includes(pathname)) {
    console.log(pathname);
    // Resolve destination: prioritize callbackUrl or default to root
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    console.log(callbackUrl);
    return NextResponse.redirect(new URL(callbackUrl, req.nextUrl));
  }

  // 4. Default: Permit request to proceed
  // Allow the request to reach its intended destination
  return NextResponse.next();
});

export const config = {
  // Performance Optimization: Only invoke middleware for specific route patterns
  matcher: [
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/shipping/:path*",
    "/admin/:path*",
  ],
};
