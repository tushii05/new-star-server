import languageService from "@/services/language.service";

export default async function getLanguageId(locale, key) {
  const { languages } = await languageService();
  const lang = languages?.find((lang) => lang.short_form === locale);

  if (!lang) return null;

  return key ? lang[key] : lang.id;
}
