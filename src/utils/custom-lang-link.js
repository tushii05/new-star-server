import { i18n } from "@/i18n.config";

export default function customLangLink(href, lang) {
  const isDefaultLang = lang === i18n.defaultLocale;
  const path = isDefaultLang ? href : `/${lang}${href}`;
  // const path = isDefaultLang ? `/${lang}${href}` : `/${lang}${href}`;
  return path;
}
