import { NextResponse } from "next/server";
import Negotiator from "negotiator";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import { i18n } from "./i18n.config";

function getLocale(request) {
  const negotiatorHeaders = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const availableLocales = i18n.locales.map((locale) => locale.short_form);
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  try {
    const locale = matchLocale(languages, availableLocales, i18n.defaultLocale);
    return locale || i18n.defaultLocale;
  } catch (error) {
    console.error("Locale matching error:", error);
    return i18n.defaultLocale;
  }
}

export async function middleware(request) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  const locale = getLocale(request) || i18n.defaultLocale;

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale.short_form}/`) &&
      pathname !== `/${locale.short_form}`
  );

  if (pathnameIsMissingLocale) {
    url.pathname = `/${i18n.defaultLocale}${pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images/).*)"],
};

// import { NextResponse } from "next/server";
// import Negotiator from "negotiator";
// import { match as matchLocale } from "@formatjs/intl-localematcher";
// import { i18n } from "./i18n.config";

// function getLocale(request) {
//   const negotiatorHeaders = {};
//   request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

//   const availableLocales = i18n.locales.map((locale) => locale.short_form);

//   // Check for locale in cookies first
//   const localeFromCookie = request.cookies.get("locale");
//   if (localeFromCookie && availableLocales.includes(localeFromCookie)) {
//     return localeFromCookie;
//   }

//   // Fallback to Accept-Language header negotiation
//   const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

//   try {
//     const locale = matchLocale(languages, availableLocales, i18n.defaultLocale);
//     return locale || i18n.defaultLocale;
//   } catch (error) {
//     console.error("Locale matching error:", error);
//     return i18n.defaultLocale;
//   }
// }

// export async function middleware(request) {
//   const url = request.nextUrl.clone();
//   const pathname = url.pathname;

//   const locale = getLocale(request) || i18n.defaultLocale;

//   // If accessing the base path `/`, redirect to `/hi/` or `/en/` based on the locale
//   if (pathname === "/") {
//     url.pathname = `/${locale}/`;
//     const response = NextResponse.redirect(url);

//     // Set locale in a cookie for persistence
//     response.cookies.set("locale", locale, { path: "/", maxAge: 60 * 60 * 24 * 30 }); // 30 days
//     return response;
//   }

//   const pathnameIsMissingLocale = i18n.locales.every(
//     (locale) =>
//       !pathname.startsWith(`/${locale.short_form}/`) &&
//       pathname !== `/${locale.short_form}`
//   );

//   if (pathnameIsMissingLocale) {
//     url.pathname = `/${locale}${pathname}`;
//     const response = NextResponse.rewrite(url);

//     // Set locale in a cookie for persistence
//     response.cookies.set("locale", locale, { path: "/", maxAge: 60 * 60 * 24 * 30 }); // 30 days
//     return response;
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images/).*)"],
// };



// import { NextResponse } from "next/server";
// import Negotiator from "negotiator";
// import { match as matchLocale } from "@formatjs/intl-localematcher";
// import { i18n } from "./i18n.config";

// function getLocale(request) {
//   const negotiatorHeaders = {};
//   request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

//   const availableLocales = i18n.locales.map((locale) => locale.short_form);

//   // Check for locale in cookies first
//   const localeFromCookie = request.cookies.get("locale");
//   if (localeFromCookie && availableLocales.includes(localeFromCookie)) {
//     return localeFromCookie;
//   }

//   // Fallback to Accept-Language header negotiation
//   const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

//   try {
//     const locale = matchLocale(languages, availableLocales, i18n.defaultLocale);
//     return locale || i18n.defaultLocale;
//   } catch (error) {
//     console.error("Locale matching error:", error);
//     return i18n.defaultLocale;
//   }
// }

// export async function middleware(request) {
//   const url = request.nextUrl.clone();
//   const pathname = url.pathname;

//   const locale = getLocale(request) || i18n.defaultLocale;

//   // Handle the base route `/` and redirect to the defaultLocale
//   if (pathname === "/") {
//     url.pathname = `/${i18n.defaultLocale}/`;
//     const response = NextResponse.redirect(url);

//     // Set locale in a cookie for persistence
//     response.cookies.set("locale", i18n.defaultLocale, {
//       path: "/",
//       maxAge: 60 * 60 * 24 * 30, // 30 days
//     });

//     return response;
//   }

//   // Check if the locale is missing in the URL
//   const pathnameIsMissingLocale = i18n.locales.every(
//     (locale) =>
//       !pathname.startsWith(`/${locale.short_form}/`) &&
//       pathname !== `/${locale.short_form}`
//   );

//   if (pathnameIsMissingLocale) {
//     url.pathname = `/${locale}${pathname}`;
//     const response = NextResponse.rewrite(url);

//     // Set locale in a cookie for persistence
//     response.cookies.set("locale", locale, {
//       path: "/",
//       maxAge: 60 * 60 * 24 * 30, // 30 days
//     });

//     return response;
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images/).*)"],
// };
