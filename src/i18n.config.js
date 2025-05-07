// import languageService from "./services/language.service";

// let i18n = {
//   defaultLocale: "hi",
//   locales: [],
// };

// async function fetchLanguages() {
//   try {
//     const { languages, defaultLanguage } = await languageService();
//     if (languages && Array.isArray(languages)) {
//       i18n.locales = languages;
//     }
//     // if (defaultLanguage && defaultLanguage.short_form) {
//     //   i18n.defaultLocale = defaultLanguage.short_form;
//     // }
//   } catch (error) {
//     console.error("Failed to fetch languages from API:", error);
//   }
// }
// fetchLanguages();

// export { i18n };

// export function isValidLocale(locale) {
//   return i18n.locales.some((lang) => lang.short_form === locale);
// }

// export function getLanguageInfo(locale) {
//   return i18n.locales.find((lang) => lang.short_form === locale);
// }

import languageService from "./services/language.service";

let i18n = {
  defaultLocale: "en",
  locales: [],
};
  
async function fetchLanguages() {
  try {
    const { languages, defaultLanguage } = await languageService();
    if (languages && Array.isArray(languages)) {
      i18n.locales = languages;
    }
  } catch (error) {
    console.error("Failed to fetch languages from API:", error);
  }
}
fetchLanguages();

export { i18n };

export function isValidLocale(locale) {
  return i18n.locales.some((lang) => lang.short_form === locale);
}

export function getLanguageInfo(locale) {
  return i18n.locales.find((lang) => lang.short_form === locale);
}
