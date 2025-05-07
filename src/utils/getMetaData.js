import siteSettings from "@/services/siteSettings.service";
import { getMediaUrl, getFullUrl } from "./getUrl";
import getLanguageId from "./langId";

export let logo = "";
const getMetaData = async (params, article) => {
  const { locale, ...restParams } = params;
  const langId = await getLanguageId(locale);
  const { generalSettings, settings } = await siteSettings(langId);
  const { application_name, site_description, keywords } = settings || {};
  const {
    title,
    summary,
    description,
    keywords: articleKeyword,
  } = article || {};
  const metaTitle = title || application_name;
  const metaDescription = summary || description || site_description;
  const metaKeywords = articleKeyword || keywords;
  const logoUrl = getMediaUrl(generalSettings?.logo);
  logo = getMediaUrl(generalSettings?.logo);
  const faviconUrl = getMediaUrl(generalSettings?.favicon);
  const ogImageUrl = getMediaUrl(article?.image_mid ?? generalSettings?.logo);
  const { fullUrl, langCode } = getFullUrl(restParams, locale);
  const authorName = article?.user?.username;

  const commonMeta = {
    title: metaTitle,
    description: metaDescription,
    // images: [
    //   {
    //     url: logoUrl,
    //     width: 750,
    //     height: 422,
    //     alt: "logo",
    //   },
    // ],
  };
  return {
    title: metaTitle,
    description: metaDescription,
    keywords: [metaKeywords],
    author: application_name,
    // generator: application_name,
    applicationName: application_name,
    robots: "all",

    openGraph: {
      ...commonMeta,
      locale: langCode,
      siteName: application_name,
      type: article ? "article" : "website",
      url: fullUrl,
      tags: metaKeywords?.split(",")?.map((key) => key.trim()),
      author: authorName,
      publishedTime: article?.created_at,
      modifiedTime: article?.updated_at,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      site: "@" + application_name,
      creator: "@" + authorName,
      title: metaTitle,
      description: metaDescription,
      url: fullUrl,
      images: [
        {
          url: ogImageUrl,
          alt: "Twitter Image",
        },
      ],
    },
    other: {
      "mobile-web-app-capable": "yes",
      "mobile-web-app-status-bar-style": "black",
      "mobile-web-app-title": application_name,
      "msapplication-TileImage": faviconUrl,
      "msapplication-TileColor": "#2F3BA2",
    },
    icons: {
      icon: [
        {
          media: "(prefers-color-scheme: light)",
          url: faviconUrl,
          width: 32,
          height: 32,
        },
        {
          media: "(prefers-color-scheme: dark)",
          url: faviconUrl,
          width: 32,
          height: 32,
        },
      ],
      apple: { url: faviconUrl, width: 32, height: 32 },
    },
    alternates: {
      canonical: fullUrl,
      languages: {
        hrefLang: langCode,
        href: fullUrl,
      },
    },
    // manifest: {
    //   href: "/api/manifest",
    // },
  };
};
export default getMetaData;
