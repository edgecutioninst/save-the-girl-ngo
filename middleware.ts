import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    if (
      (path.startsWith("/admin") || path.startsWith("/settings")) && 
      token?.role !== "ADMIN"
    ) {
      return NextResponse.redirect(new URL("/", req.url)); 
    }
  },
  {
    callbacks: {
      // The authorized callback is called when a user is authenticated
      authorized: ({ token }) => !!token, 
    },
  }
);

export const config = {
  // This Regex protects EVERY page EXCEPT the login page, the auth API, and static files
  matcher: ["/((?!login|api/auth|_next/static|_next/image|favicon.ico|logo.png).*)"],
};