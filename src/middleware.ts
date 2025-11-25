import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { getSessionCookie } from "better-auth/cookies";

import { locales, localePrefix, defaultLocale } from "./i18n/navigation";
import { hasValidBackendUrl, isAuthAvailable } from "./utils/presentationMode";

const handleI18nRouting = createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
  localeDetection: false,
});

// Public routes that don't require authentication
const publicPaths = ["/login", "/register"];

const isPublicPath = (pathname: string): boolean => {
  // Remove locale prefix if present (e.g., /en/login -> /login)
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(\/|$)/, "/");
  return publicPaths.some((path) => pathWithoutLocale.startsWith(path));
};

const middleware = (request: NextRequest) => {
  // Check if backend and auth are properly configured
  const hasBackend = hasValidBackendUrl();
  const hasAuth = isAuthAvailable();

  // If no backend or auth is configured, run in presentation mode (no route protection)
  if (!hasBackend || !hasAuth) {
    console.log(
      "[Middleware] Running in PRESENTATION MODE - no route protection"
    );
    return handleI18nRouting(request);
  }

  const sessionCookie = getSessionCookie(request);
  const pathname = request.nextUrl.pathname;

  // Redirect to login if not authenticated and trying to access protected route
  if (!sessionCookie && !isPublicPath(pathname)) {
    const locale = pathname.match(/^\/([a-z]{2})\//)?.at(1) || "";
    const loginUrl = new URL(
      `/${locale ? locale + "/" : ""}login`,
      request.url
    );
    return NextResponse.redirect(loginUrl);
  }

  return handleI18nRouting(request);
};

export default middleware;

export const config = {
  matcher: "/((?!_next|_vercel|api|trpc|.*\\..*).*)",
};
