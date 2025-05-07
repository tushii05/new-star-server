import Page from "@/components/page/page";
import { pagesService } from "@/services/article.service";
import { getCategoriesBreadCrumbs } from "@/services/category.service";

export default async function page({ params }) {
  const { subSlug } = params;
  const [data, breadCrumbData] =
    subSlug &&
    (await Promise.all([
      pagesService(subSlug),
      getCategoriesBreadCrumbs(subSlug, "page"),
    ]));

  const breadcrumb = await import("@/utils/getBreadCrumbs").then((module) =>
    module.getBreadCrumbs(
      ["parent", "sub_parent"],
      decodeURI(subSlug),
      breadCrumbData
    )
  );
  return <Page params={params} breadcrumb={breadcrumb} data={data?.data} />;
}
