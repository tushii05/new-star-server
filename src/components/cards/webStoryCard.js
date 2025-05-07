import { checkImage } from "@/utils/checkImage";
import CustomLink from "@/utils/custom-link";
import { formatDate } from "@/utils/formatDate";
import { getMediaUrl } from "@/utils/getUrl";
import timeAgo from "@/utils/time-conversion";
import Image from "next/image";
import React from "react";

export default function WebStoryCard({ story, locale }) {
  return (
    <div className="detail-div bdr pb-4 web-stories-list">
      <div className="row">
        <div className="col-lg-4 col-md-4">
          <CustomLink
            lang={locale}
            href={"/web-story/" + story?.slug}
            className="featured-img mt-3"
          >
            <Image
              width={244.438}
              height={355}
              src={checkImage(
                story?.cover_image &&
                  story?.cover_image !== "NULL" &&
                  story?.cover_image !== null
                  ? getMediaUrl(story?.cover_image)
                  : null
              )}
              alt={story?.title ?? "webstory"}
              className="img-fluid"
              sizes="(max-width : 992px) 244.438px, 100%"
              loading="lazy"
              placeholder="blur"
              blurDataURL={process.env.NEXT_PUBLIC_BLUR_IMAGE}
            />
          </CustomLink>
        </div>
        <div className="col-lg-8 col-lg-8">
          <div className="row">
            <div className="col-12">
              <h1 className="news-card-heading">
                <CustomLink
                  lang={locale}
                  href={"/web-story/" + story?.slug}
                  className="featured-img mt-3"
                >
                  {story?.title}
                </CustomLink>
              </h1>
              <p className="short-desc">{story?.content}</p>
            </div>
          </div>
          <div className="row news-date-time mt-2">
            <div className="col-12 d-flex pe-1">
              <p className="mb-0 auther">
                <span className="date me-1 ms-0 ps-0" style={{ borderLeft: 0 }}>
                  {formatDate(story?.created_at)}
                </span>{" "}
                <span className="time">{timeAgo(story?.created_at)}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
