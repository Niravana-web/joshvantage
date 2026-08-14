import { NextResponse, type NextRequest } from "next/server";

/* HTTP Basic auth gate for /admin — password from ADMIN_PASSWORD env.
   The browser shows its native login prompt; username is ignored. */
export function proxy(request: NextRequest) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return new NextResponse("Admin access is not configured.", { status: 503 });
  }

  const cookie = request.cookies.get("jv_admin")?.value;
  if (cookie === expected) return NextResponse.next();

  const header = request.headers.get("authorization") ?? "";
  if (header.startsWith("Basic ")) {
    const [, password = ""] = atob(header.slice(6)).split(":");
    if (password === expected) {
      /* Cookie fallback so same-origin fetch() calls stay authenticated
         even when the browser doesn't replay the Basic header. */
      const res = NextResponse.next();
      res.cookies.set("jv_admin", expected, {
        httpOnly: true,
        sameSite: "strict",
        path: "/admin",
      });
      return res;
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Josh Vantage Admin"' },
  });
}

export const config = {
  matcher: "/admin/:path*",
};
