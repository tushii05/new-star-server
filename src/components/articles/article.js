import Image from "next/image";
import ArticleImages from "./articleImages";
import postViewService from "@/services/postView.service";
import CustomLink from "@/utils/custom-link";
import { getMediaUrl } from "@/utils/getUrl";
import dynamic from "next/dynamic";
import ShareModalWrapper from "../share/shareModalWrapper";
const CommentWrapper = dynamic(() => import("../comments/commentWrapper"));
const AdSpace = dynamic(() => import("../ad-space/ad-space"));
const RssFeed = dynamic(() => import("../rss/rssFeed"));
const CommentPost = dynamic(() => import("../comments/comment-post"));
const HtmlContent = dynamic(() => import("@/utils/htmlContent"));
const ArticleTypeClient = dynamic(() => import("./articleTypeClient"));
const BookmarkPost = dynamic(() => import("../bookmark-post/bookmarkPost"));

export default async function Article({ params, data, session }) {
  const { slug, locale } = params;
  const userId = session?.user?.id;
  const {
    comments,
    saved,
    totalComments,
    comment_system,
    post: article,
    post_sorted_list_item: sortedList,
    table_of_contents_item: tableOfContents,
    trivia_quiz_item: triviaQuiz,
    poll_item: pollItem,
    personality_quiz_item: personalityQuiz,
  } = data;
  const postType = article?.post_type;

  if (article?.id) {
    postViewService({
      post_id: article?.id,
      post_user_id: userId || 0,
    });
  }
  return (
    <>
      <div className="detail-div blue-line pb-4">
        <div className="row">
          <div className="col-12">
            <p className="page-active text-truncate m-0 p-0">
              <CustomLink href="/" lang={locale}>
                HOME
              </CustomLink>
              &nbsp;|&nbsp;
              <CustomLink
                href={"/" + article?.category?.name_slug}
                lang={locale}
              >
                {article?.category?.name}
              </CustomLink>
              &nbsp;|&nbsp;
              <CustomLink href={"/" + article?.title_slug} lang={locale}>
                {article?.title}
              </CustomLink>
            </p>
          </div>
        </div>
        <div className="row my-3">
          <div className="col-7">
            <p className="cat-detail mb-0">
              <CustomLink lang={locale} href={article?.category?.name_slug}>
                {article?.category?.name}
              </CustomLink>
            </p>
          </div>
          <div className="col-5 text-end">
            <BookmarkPost
              type="article"
              saved={saved}
              articleId={article?.id}
              key={article?.id || saved}
            />
            {/* share */}
            <ShareModalWrapper title={article?.title} params={params} />
          </div>
        </div>
        <AdSpace locale={locale} position="post_top" />
        <div className="row">
          <div className="col-12">
            <h1 className="news-card-heading">{article?.title}</h1>
          </div>
        </div>
        <p className="summary">{article?.summary}</p>
        <div className="row news-date-time">
          <div className="col-lg-8 col-md-8 col-sm col-12 d-flex mt-2 ">
            <p className="mb-0">
              By:{" "}
              <CustomLink
                lang={locale}
                href={"/profile/" + article?.user?.slug}
              >
                {article?.user?.username}
              </CustomLink>
            </p>
            <p className="mb-0">
              <span className="date">
                {import("@/utils/formatDate").then((module) =>
                  module.formatDate(article?.created_at)
                )}
              </span>
              <span className="time">
                {import("@/utils/formatDate").then((module) =>
                  module.timeAgo(article?.created_at)
                )}
              </span>
            </p>
          </div>
          <div className="col-lg-4 col-md-4 col-sm col-12 cat-row mt-2 d-flex justify-content-lg-end">
            <p className="eye-icon me-3 mb-0 d-flex align-items-center">
              <Image
                src="/images/icon/eye.svg"
                width={13}
                height={11}
                alt="view"
                className="me-1"
              />

              <span className="view-count">{article?.pageviews}</span>
            </p>
            <p className="comment-icon mb-0 d-flex align-items-center">
              <Image
                src="/images/icon/comment.svg"
                width={15}
                height={16}
                alt="view"
                className="me-1"
                style={{ height: "14px !important" }}
                priority
              />
              <span className="comments-count">{totalComments}</span>
            </p>
          </div>
        </div>
        {/* Article */}
        {!article?.video_embed_code ? (
          <div className="featured-img mt-3 article-image featured-slider position-relative">
            <ArticleImages article={article} />
            <p className="img-credit">{article?.image_description}</p>
          </div>
        ) : null}
        <AdSpace locale={locale} position="in_article_1" />
        <AdSpace locale={locale} position="in_article_2" />
        <ArticleTypeClient
          postType={postType}
          article={article}
          video={article?.video_embed_code}
          triviaQuiz={triviaQuiz}
          pollItem={pollItem}
          sortedList={sortedList}
          tableOfContents={tableOfContents}
          personalityQuiz={personalityQuiz}
          locale={locale}
          slug={slug}
        />{" "}
        <div className="content-div mt-4">
          <HtmlContent data={article?.content} className="article-image" />
        </div>
        {/* Optional Url */}
        {article?.optional_url && (
          <div className="d-flex flex-row-reverse mt-4">
            <a
              href={article?.optional_url}
              className="btn btn-md btn-primary"
              target="_blank"
              rel="nofollow"
            >
              Click Here To See More
              <Image
                src="/images/icon/arrowLink.svg"
                width={16}
                height={16}
                className="m-l-5"
                alt="view"
              />
            </a>
          </div>
        )}
        {/* Additional Files */}
        {article?.post_files?.length ? (
          <div className="px-3">
            <h5 className="row">Files:</h5>
            {article?.post_files.map((file, fileIndex) => (
              <a
                href={getMediaUrl(file?.file?.file_path, false)}
                key={fileIndex}
                download
                className="file-download row"
              >
                {file?.file?.file_name}
              </a>
            ))}
          </div>
        ) : null}
        {/* Tags */}
        {article?.tags?.length ? (
          <div className="d-flex align-items-center popular-tags mt-2">
            <div>
              <h5>Tags:</h5>
            </div>
            <div className="ms-2 mt-2">
              {article?.tags.map((tag, index) => (
                <div className="badge bg-secondary" key={index}>
                  <CustomLink
                    href={`/tag/${tag?.tag}`}
                    lang={locale}
                    name={tag?.tag}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
      <div className="content-div mt-4 ">
        <div className="d-flex">
          <Image
            src={
              article?.user?.avatar
                ? getMediaUrl(article?.user?.avatar)
                : "/images/icon/user.svg"
            }
            width={55}
            height={55}
            alt={article?.user?.username ?? "avatar"}
            className="me-2"
          />
          <div>
            <CustomLink href={"/profile/" + article?.user?.slug} lang={locale}>
              <p className="m-0 p-0">{article?.user?.username}</p>
            </CustomLink>
            <RssFeed locale={locale} slug={article?.user?.slug} type="author" />
          </div>
        </div>
      </div>
      <AdSpace locale={locale} position="post_bottom" />

      {comment_system && (
        <>
          <div className="comment-div mt-3">
            <CommentPost post_id={article?.id} slug={slug} />
          </div>
          <CommentWrapper
            comments={comments}
            post_id={article?.id}
            session={session?.user}
          />
        </>
      )}
    </>
  );
}
