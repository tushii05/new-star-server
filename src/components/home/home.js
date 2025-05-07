import Featured from "../sections/featured";
import homeService from "@/services/home.service";
import getLanguageId from "@/utils/langId";
import dynamic from "next/dynamic";

// Memoized dynamic imports
const AdSpace = dynamic(() => import("../ad-space/ad-space"), { ssr: false });
const Breaking = dynamic(() => import("../sections/breaking"), { ssr: false });
const SideWidgetsHome = dynamic(() => import("../sections/sideWidgetsHome"), {
  ssr: false,
});

/**
 * Home Page Component
 * Fetches and displays homepage content based on the selected locale.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.locale - The current locale/language.
 * @returns {JSX.Element}
 */
export default async function Home({ locale }) {
  const langId = await getLanguageId(locale);
  const { home, widgets } = await homeService(langId);
  const { featuredPosts, breakingNews, categorizedPosts, videos } = home;

  return (
    <>
      {featuredPosts?.length && (
        <Featured featuredPosts={featuredPosts} locale={locale} />
      )}
      <AdSpace locale={locale} position="index_top" />
      {breakingNews?.length && (
        <Breaking breakingNews={breakingNews} locale={locale} />
      )}
      <SideWidgetsHome
        categorizedPosts={categorizedPosts}
        dynamicContent={widgets}
        videos={videos}
        locale={locale}
      />
      <AdSpace locale={locale} position="index_bottom" />
    </>
  );
}
