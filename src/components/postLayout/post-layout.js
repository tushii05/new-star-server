import dynamic from "next/dynamic";
import { Fragment } from "react";
import CustomLink from "../../utils/custom-link";

const AdSpace = dynamic(() => import("../ad-space/ad-space"));
const MeduimCard = dynamic(() => import("@/components/cards/MeduimCard"));
const LoadMoreCategoryPost = dynamic(() =>
  import("@/components/category-post/load-more-category-post")
);

export default function PostLayout({
  categoriesData,
  type,
  params: { slug, subSlug, subChildSlug, locale },
  breadcrumb,
  saved,
}) {
  const renderBreadcrumbs = () => (
    <p className="mb-4 page-active text-uppercase">
      <CustomLink href="/" lang={locale}>
        Home
      </CustomLink>
      &nbsp;|&nbsp;
      <CustomLink href={`/${slug}`} lang={locale}>
        {breadcrumb?.parent}
      </CustomLink>
      {subSlug && (
        <CustomLink href={`/${slug}/${subSlug}`} lang={locale}>
          &nbsp;|&nbsp;{breadcrumb?.sub_parent}
        </CustomLink>
      )}
      {subChildSlug && (
        <CustomLink href={`/${slug}/${subSlug}/${subChildSlug}`} lang={locale}>
          &nbsp;|&nbsp;{breadcrumb?.children}
        </CustomLink>
      )}
    </p>
  );

  const renderPosts = () =>
    categoriesData?.posts?.map((post, index) => (
      <Fragment key={`${index}-${post?.id}`}>
        {index === 2 && <AdSpace locale={locale} position="posts_top" />}
        <MeduimCard
          post={post}
          categoryName={categoriesData?.name}
          className="col-lg-6 col-md-10 bdr-bottom-1"
          locale={locale}
          saved={saved}
        />
      </Fragment>
    ));

  return (
    <>
      <div className="row">
        <div className="col-12">
          {renderBreadcrumbs()}
          <h2 className="sec-heading text-dark text-uppercase mb-0">
            {type && `${type} :`} {breadcrumb?.parent ?? decodeURI(slug)}
          </h2>
        </div>
      </div>
      <div className="row news-cat-three">
        {categoriesData?.posts?.length > 0 ? renderPosts() : null}

        <LoadMoreCategoryPost
          params={{ slug, subSlug, subChildSlug, locale }}
          type={type}
        />
      </div>
      <AdSpace locale={locale} position="posts_bottom" />
    </>
  );
}
