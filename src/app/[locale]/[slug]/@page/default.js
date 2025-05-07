import Page from "@/components/page/page";
import { pagesService } from "@/services/article.service";
import { getCategoriesBreadCrumbs } from "@/services/category.service";

export default async function page({ params }) {
  const { slug } = params;
  const [data, breadCrumbData] =
    slug &&
    (await Promise.all([
      pagesService(slug),
      getCategoriesBreadCrumbs(slug, "page"),
    ]));

  const breadcrumb = await import("@/utils/getBreadCrumbs").then((module) =>
    module.getBreadCrumbs(["parent"], decodeURI(slug), breadCrumbData)
  );
  return <Page params={params} breadcrumb={breadcrumb} data={data?.data} />;
}
