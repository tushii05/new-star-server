import Header from "@/components/header/header";
import { getMenu, getOtherMenu } from "@/services/category.service";
import siteSettings from "@/services/siteSettings.service";
import getLanguageId from "@/utils/langId";
import dynamic from "next/dynamic";
const TopHeader = dynamic(() => import("@/components/header/topHeader"));
const SideHeader = dynamic(() =>
  import("@/components/header/sideHeader/sideHeader")
);
export default async function DefaultHeader({ params }) {
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
      {topMenu?.length ? <TopHeader locale={locale} topMenu={topMenu} /> : null}
      <Header
        locale={locale}
        categories={categories}
        menuLimit={menuLimit}
        generalSettings={generalSettings}
        settings={settings}
      />
      <SideHeader
        locale={locale}
        categories={categories}
        menuLimit={menuLimit}
        multilingual_system={generalSettings?.multilingual_system}
      />
    </>
  );
}
