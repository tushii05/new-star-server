import dynamic from "next/dynamic";
import Header from "../header/header";
import getLanguageId from "@/utils/langId";
import { getMenu, getOtherMenu } from "@/services/category.service";
import siteSettings from "@/services/siteSettings.service";
import TopHeader from "../header/topHeader";
const SideHeader = dynamic(() => import("../header/sideHeader/sideHeader"), {
  ssr: false,
});
const Footer = dynamic(() => import("../footer/footer"));

export default async function Layout({ children, params }) {
  const { locale } = params;
  const lang_id = await getLanguageId(locale);
  const [
    { categories, menuLimit },
    { topMenu },
    { generalSettings, settings },
  ] = await Promise.all([
    getMenu(lang_id),
    getOtherMenu(lang_id),
    siteSettings(lang_id),
  ]);

  return (
    <>
      {/* {topMenu?.length ? <TopHeader locale={locale} topMenu={topMenu} /> : null}
      <Header
        locale={locale}
        categories={categories}
        menuLimit={menuLimit}
        generalSettings={generalSettings}
        settings={settings}
      /> */}
      <SideHeader
        locale={locale}
        categories={categories}
        menuLimit={menuLimit}
        multilingual_system={generalSettings?.multilingual_system}
      />
      {children}
      {/* <Footer locale={locale} lang_id={lang_id} /> */}
    </>
  );
}
