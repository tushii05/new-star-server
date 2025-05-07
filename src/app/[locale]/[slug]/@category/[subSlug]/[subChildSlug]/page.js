import CategoryPost from "@/components/category-post/category-post";
import {
  getCategoriesBreadCrumbs,
  getCategoriesPosts,
} from "@/services/category.service";
import { getBreadCrumbs } from "@/utils/getBreadCrumbs";
import getLanguageId from "@/utils/langId";

export default async function page({ params }) {
  const { subChildSlug, locale } = params;
  const lang_id = await getLanguageId(locale);
  const [data, breadCrumbData] = await Promise.all([
    getCategoriesPosts(subChildSlug, 1, 10, lang_id),
    getCategoriesBreadCrumbs(subChildSlug, ""),
  ]);

  const breadcrumb = getBreadCrumbs(
    ["parent", "sub_parent", "children"],
    decodeURI(subChildSlug),
    breadCrumbData
  );

  return <CategoryPost params={params} breadcrumb={breadcrumb} data={data} />;
}
