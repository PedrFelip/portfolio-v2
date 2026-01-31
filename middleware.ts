import { type NextRequest, NextResponse } from "next/server";
import { DEFAULT_LANGUAGE, type Language } from "./src/app/lib/i18n";

function isLanguage(lang: string): lang is Language {
  return lang === "en" || lang === "pt";
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for api, _next, public files, and links page
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".") ||
    pathname.startsWith("/links")
  ) {
    return NextResponse.next();
  }

  // Check if path already has language prefix
  const languagePrefix = pathname.split("/")[1];
  if (isLanguage(languagePrefix)) {
    return NextResponse.next();
  }

  // Get preferred language from Accept-Language header
  const acceptLanguage = request.headers.get("accept-language") || "";
  let preferredLanguage: Language = DEFAULT_LANGUAGE;

  // Parse accept-language header
  if (acceptLanguage.toLowerCase().includes("pt")) {
    preferredLanguage = "pt";
  } else if (acceptLanguage.includes("en")) {
    preferredLanguage = "en";
  }

  // Redirect to /[lang]/...
  const newUrl = new URL(`/${preferredLanguage}${pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
