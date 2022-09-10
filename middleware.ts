import { NextRequest, NextResponse } from "next/server";
import {
  apiRedirect,
  apiRedirectToLogin,
  apiUnauthorized,
  getSession,
} from "@/utils";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/checkout")) {
    const session = await getSession(req);

    if (!session) {
      return apiRedirectToLogin(req);
    }

    const cartProducts = req.cookies.get("cartProducts");

    if (!cartProducts || JSON.parse(cartProducts) < 1) {
      return apiRedirect(req, "/");
    }

    return NextResponse.next();
  }

  if (req.nextUrl.pathname.startsWith("/user")) {
    const session = await getSession(req);

    if (!session) {
      return apiRedirectToLogin(req);
    }

    return NextResponse.next();
  }

  if (req.nextUrl.pathname.startsWith("/admin")) {
    const session = await getSession(req);

    if (!session) {
      return apiRedirectToLogin(req);
    }

    if (session.user.role !== "admin") {
      return apiRedirect(req, "/");
    }

    return NextResponse.next();
  }

  if (req.nextUrl.pathname.startsWith("/api/admin")) {
    const session = await getSession(req);

    if (!session) {
      return apiUnauthorized(req);
    }

    if (session.user.role !== "admin") {
      return apiUnauthorized(req);
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/checkout/:path*",
    "/user/:path*",
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};
