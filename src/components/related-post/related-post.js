import dynamic from "next/dynamic";
const LoadMoreRelatedPost = dynamic(() => import("./load-more-related-post"));
const RelatedPostCard = dynamic(() => import("./related-post-card"));

export default async function RelatedPost({
  data,
  locale,
  categorySlug,
  langId,
}) {
  return (
    <div>
      <div className="row mt-4">
        <div className="col-5">
          <h2 className="sec-heading text-dark">RELATED POST</h2>
        </div>
      </div>
      <div className="mb-4 ">
        <div className="row news-cat-three position-relative">
          <RelatedPostCard posts={data} locale={locale} from="more" />
          <LoadMoreRelatedPost
            slug={categorySlug}
            locale={locale}
            lang_id={langId}
          />
        </div>
      </div>
    </div>
  );
}
