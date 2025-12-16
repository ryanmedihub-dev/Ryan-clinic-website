import { withAuth } from "next-auth/middleware";

export default withAuth(
  function proxy(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    if (token && (pathname === "/login" || pathname === "/register")) {
      return Response.redirect(new URL("/admin", req.url));
    }

    if (!token && pathname.startsWith("/admin")) {
      return Response.redirect(new URL("/login", req.url));
    }
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/login", "/register"],
};
