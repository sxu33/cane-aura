import { auth } from "@/auth";
import { NextResponse } from "next/server";

const guestPaths = ["/sign-in", "/sign-up", "/forgot-password"];

export const proxy = auth((req) => {
  const pathname = req.nextUrl.pathname;
  const isLoggedIn = !!req.auth?.user;

  if (!isLoggedIn) return NextResponse.next();

  if (guestPaths.includes(pathname) || pathname.startsWith("/reset-password")) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/sign-in", "/sign-up", "/forgot-password", "/reset-password/:path*"],
};
