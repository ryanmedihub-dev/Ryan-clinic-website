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

    // Public endpoints that accept POST form submissions from visitors:
    const isPublicWriteApi =
      pathname.startsWith("/api/book-consult") ||
      pathname.startsWith("/api/leads") ||
      pathname.startsWith("/api/apply") ||
      pathname.startsWith("/api/feedback") ||
      pathname.startsWith("/api/send-international") ||
      pathname.startsWith("/api/send-to-sheet") ||
      pathname.startsWith("/api/submitInterviewForm") ||
      pathname.startsWith("/api/prp-form") ||
      pathname.startsWith("/api/ai-interview") ||
      pathname.startsWith("/api/razorpay") ||
      pathname.startsWith("/api/auth");

    // Block unauthenticated writes to admin API routes → return 401
    const isWrite = ["POST", "PUT", "PATCH", "DELETE"].includes(req.method);
    if (!token && isWrite && !isPublicWriteApi && (pathname.startsWith("/admin") || pathname.startsWith("/api/"))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ── SURGERY ROUTING ─────────────────────────────────────────────────────
    //
    // FINAL PUBLIC URL FORMAT: /surgery/[slug]
    //
    // Old root surgery URLs (e.g. /hair-transplant-surgery-in-mumbai)
    // → 308 Permanent Redirect to /surgery/[slug]
    //
    // /surgery/[slug] requests pass through normally — this IS the final URL.
    // No rewrite, no redirect needed.
    // ────────────────────────────────────────────────────────────────────────

    // Detect root-level surgery slug patterns:
    //   /hair-transplant-surgery-in-*
    //   /beard-transplant-surgery-in-*
    //   etc.
    if (
      !pathname.startsWith("/surgery") &&
      !pathname.startsWith("/api/") &&
      !pathname.startsWith("/_next/") &&
      !pathname.startsWith("/admin") &&
      !pathname.startsWith("/uploads/") &&
      !pathname.includes(".") &&
      /^\/([\w-]+-surgery-in-[\w-]+)/.test(pathname)
    ) {
      const slug = pathname.replace(/^\//, "");
      return NextResponse.redirect(new URL(`/surgery/${slug}`, req.url), 308);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|uploads/|api/auth/).*)",
  ],
};

