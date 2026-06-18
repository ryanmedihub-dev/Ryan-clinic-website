import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function proxy(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // Redirect already-logged-in users away from the login page
    if (token && pathname === "/login") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    // Block unauthenticated access to admin pages → redirect to login
    if (!token && pathname.startsWith("/admin")) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Block unauthenticated writes to admin API routes → return 401
    // GET is intentionally allowed so public pages can still fetch content
    const isWrite = ["POST", "PUT", "PATCH", "DELETE"].includes(req.method);
    if (!token && isWrite) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/login",
    "/api/blog/:path*",
    "/api/service/:path*",
    "/api/sliders/:path*",
    "/api/upload/:path*",
  ],
};
