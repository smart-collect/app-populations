import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/", "/login", "/register"];

const PROTECTED_PREFIXES = ["/home", "/map", "/reports", "/profile", "/notifications"];

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

function hasAuthToken(request: NextRequest): boolean {
  return Boolean(request.cookies.get("sc_token")?.value);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authed = hasAuthToken(request);

  if (pathname === "/" && authed) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (PUBLIC_ROUTES.includes(pathname)) {
    if ((pathname === "/login" || pathname === "/register") && authed) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
    return NextResponse.next();
  }

  if (isProtectedRoute(pathname) && !authed) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
