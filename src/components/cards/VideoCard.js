import checkPostType from "@/utils/post-type-check";
import timeAgo from "@/utils/time-conversion";
import Image from "next/image";
import React from "react";
import CustomLink from "../../utils/custom-link";
import BookmarkPost from "../bookmark-post/bookmarkPost";
import slugGenerator from "@/utils/slug-generator";
import { getMediaUrl } from "@/utils/getUrl";
import { checkImage } from "@/utils/checkImage";
import { formatDate } from "@/utils/formatDate";
import { formatNumber } from "@/utils/formatNumber";

export default function VideoCard({ video, locale, categoryName }) {
  return (
    <div className="item">
      <div className="news-card mb-0 pe-3 video-card">
        <CustomLink href={`/${video?.title_slug}`} lang={locale}>
          <Image
            width={282}
            height={181.766}
            src={checkImage(
              video?.image_mid &&
                video?.image_mid !== "NULL" &&
                video?.image_mid !== null
                ? getMediaUrl(video?.image_mid)
                : video?.image_url
            )}
            alt={video.title ?? "article"}
            className="img-fluid"
            sizes="(max-width : 992px) 282px, 382px"
            loading="lazy"
            placeholder="blur"
            blurDataURL={process.env.NEXT_PUBLIC_BLUR_IMAGE}
          />
        </CustomLink>
        <BookmarkPost articleId={video?.id} />
        <div className="row pt-2 cat-row">
          <div className="col-6">
            <p className="cat-name mb-0">
              <CustomLink
                lang={locale}
                href={`/${
                  video?.category?.name_slug ??
                  slugGenerator(categoryName ?? video?.category?.name)
                }`}
              >
                {categoryName ?? video?.category?.name}
              </CustomLink>
            </p>
          </div>
          <div className="col-6 d-flex justify-content-end">
            <p className="eye-icon me-3 mb-0 d-flex align-items-center">
              <svg
                className="me-2"
                width={13}
                height={11}
                viewBox="0 0 13 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.249939 5.85913C0.249939 6.88376 0.515539 7.22882 1.04675 7.91894C2.10741 9.29688 3.88626 10.8591 6.49994 10.8591C9.11363 10.8591 10.8924 9.29688 11.9531 7.91894C12.4843 7.22882 12.7499 6.88376 12.7499 5.85913C12.7499 4.83451 12.4843 4.48946 11.9531 3.79934C10.8924 2.42136 9.11363 0.859131 6.49994 0.859131C3.88626 0.859131 2.10741 2.42136 1.04675 3.79934C0.515539 4.48946 0.249939 4.83451 0.249939 5.85913ZM6.49994 3.51538C5.20552 3.51538 4.15619 4.56471 4.15619 5.85913C4.15619 7.15357 5.20552 8.20288 6.49994 8.20288C7.79438 8.20288 8.84369 7.15357 8.84369 5.85913C8.84369 4.56471 7.79438 3.51538 6.49994 3.51538Z"
                  fill="#A5A5A5"
                />
              </svg>
              {formatNumber(video?.pageviews)}
            </p>
            <p className="comment-icon mb-0 d-flex align-items-center">
              <svg
                className="me-2"
                width={15}
                height={16}
                viewBox="0 0 15 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.85492 12.0897C9.68429 11.676 11.8749 9.38037 11.8749 6.57037C11.8753 6.1682 11.8301 5.7673 11.7399 5.37537C12.9487 6.09537 13.7499 7.35162 13.7499 8.78099C13.749 9.56559 13.5061 10.3308 13.0543 10.9722C13.0918 11.5654 13.3018 12.0854 13.6855 12.5329C13.7205 12.5732 13.7426 12.623 13.7491 12.676C13.7556 12.729 13.7462 12.7827 13.722 12.8303C13.6979 12.8779 13.6602 12.9172 13.6136 12.9433C13.567 12.9693 13.5137 12.9809 13.4605 12.9766C12.6062 12.9072 11.9074 12.7104 11.3643 12.386C10.742 12.6787 10.0626 12.8296 9.37492 12.8279C8.48104 12.8319 7.60536 12.5754 6.85492 12.0897Z"
                  fill="#A5A5A5"
                />
                <path
                  d="M4.76553 10.7698C5.14053 10.8585 5.53303 10.906 5.93741 10.906C8.52616 10.906 10.6249 8.96476 10.6249 6.56976C10.6249 4.17601 8.52616 2.23413 5.93741 2.23413C3.34866 2.23413 1.24991 4.17538 1.24991 6.57038C1.24991 7.78663 1.79116 8.88601 2.66366 9.67351C2.58976 10.204 2.36279 10.7013 2.01053 11.1048C1.97302 11.1479 1.94925 11.2013 1.94226 11.2581C1.93526 11.3149 1.94536 11.3725 1.97126 11.4235C1.99717 11.4745 2.0377 11.5166 2.08767 11.5444C2.13764 11.5723 2.19478 11.5846 2.25178 11.5798C3.31428 11.4935 4.15241 11.2235 4.76553 10.7698Z"
                  fill="#A5A5A5"
                />
              </svg>
              {video?.comment_count}
            </p>
          </div>
        </div>
        <h4 className="news-card-heading">
          <CustomLink
            href={`/${video?.title_slug}`}
            lang={locale}
            className="text-truncate-2"
          >
            {video?.title}
          </CustomLink>
        </h4>
        <p className="news-card-desc mb-2 text-truncate-3">{video?.summary}</p>
        <div className="row news-date-time mt-2">
          <div className="col-5 pe-0">
            <p className="mb-0">
              By:{" "}
              <CustomLink
                href={`/profile/${
                  video?.user?.slug ?? slugGenerator(video?.user?.username)
                }`}
                lang={locale}
                name={video?.user?.username}
              />
            </p>
          </div>
          <div className="col-7 d-flex justify-content-end">
            <p className="mb-0">
              <span className="date me-2">{formatDate(video?.created_at)}</span>
              <span className="time">{timeAgo(video?.created_at)}</span>
            </p>
          </div>
        </div>
        {checkPostType(video?.post_type, 73, 73)}
      </div>
    </div>
  );
}
