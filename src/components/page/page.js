import CustomLink from "../../utils/custom-link";
import PageLayout from "../layout/pageLayout";
import dynamic from "next/dynamic";
const HtmlContent = dynamic(() => import("@/utils/htmlContent"));

export default async function Page({ params, breadcrumb, data: pageData }) {
  const { slug, subSlug, locale } = params;

  return (
    <>
      <div className="row">
        <div className="col-12">
          <p className="mb-4 page-active text-uppercase">
            <CustomLink href="/" lang={locale} name="HOME" /> |{" "}
            <CustomLink href={`/${slug}`} lang={locale}>
              {breadcrumb?.parent}
            </CustomLink>
            <CustomLink hidden={!subSlug} href={`/${subSlug}`} lang={locale}>
              &nbsp;|&nbsp;{breadcrumb?.sub_parent}
            </CustomLink>
          </p>
          <h2 className="sec-heading text-dark text-uppercase mb-3">
            {pageData?.title}
          </h2>
        </div>
      </div>
      <HtmlContent data={pageData?.page_content} className="article-image" />
      <p className="mb-0">
        <span className="date">
          {import("@/utils/formatDate").then((module) =>
            module.formatDate(pageData?.created_at)
          )}
        </span>
        &nbsp;
        <span className="time">
          {import("@/utils/formatDate").then((module) =>
            module.timeAgo(pageData?.created_at)
          )}
        </span>
      </p>
    </>
  );
}
