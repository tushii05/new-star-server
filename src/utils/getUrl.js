import { i18n } from "@/i18n.config";

// const getMediaUrl = (url) => {
//   return `${process.env.NEXT_PUBLIC_ASSETS_URL}/${url}`;
// };

const getMediaUrl = (url, isOld = false) => {
  return isOld
    ? `${process.env.NEXT_PUBLIC_STACKUMBRELLA_URL}/${url}`
    : `${process.env.NEXT_PUBLIC_ASSETS_URL}/${url}`;
};

const getFullUrl = (params, lang = i18n.defaultLocale) => {
  // Construct the path from the params object
  const path = Object.entries(params)
    .filter(([key, value]) => Boolean(key) && Boolean(value)) // Filter out empty keys or values
    .map(([key, value]) => decodeURI(value)) // Decode first, then encode for safety
    .join("/"); // Remove any double slashes

  // Determine if the language prefix should be added
  const isDefaultLang = lang === i18n.defaultLocale;
  const langPrefix = isDefaultLang ? "" : `/${lang}`;

  // Construct the full URL with optional language prefix
  return {
    langCode: i18n?.language_code,
    fullUrl: `${process.env.NEXT_PUBLIC_APP_URL.replace(
      /\/+$/,
      ""
    )}${langPrefix}/${path}`,
  };
};

export { getMediaUrl, getFullUrl };
