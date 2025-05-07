"use client";
import { formatDate } from "@/utils/formatDate";
import timeAgo from "@/utils/time-conversion";
import { useMemo } from "react";
import dynamic from "next/dynamic";

const HtmlContent = dynamic(() => import("@/utils/htmlContent"));
const RenderMoreLink = dynamic(() => import("./renderMoreLink"));

export default function Custom({ data, locale }) {
  const { obj, more, type } = data;

  return obj?.length
    ? obj.map((customItem, customItemIndex) => {
        const { created_at, title, content } = customItem;
        const formattedDate = useMemo(
          () => formatDate(created_at),
          [created_at]
        );
        const timeAgoText = useMemo(() => timeAgo(created_at), [created_at]);

        return (
          <div key={customItemIndex} className="position-relative">
            <div className="row mb-2 mx-lg-auto">
              <div className="col-12 ps-lg-0">
                <h2 className="sec-heading text-dark mb-2 text-uppercase">
                  {title}
                </h2>
              </div>
            </div>
            <div className="row bdr mb-4 pb-3 mx-auto news-6b">
              <div className="col-lg-12 col-md-7 ps-lg-0 ps-md-0">
                <div className="row cat-row">
                  <div className="col-12 col-md-6">
                    <p className="cat-name mb-0 text-uppercase"></p>
                  </div>
                </div>
                <HtmlContent data={content} className="news-card-desc mb-2" />
              </div>
              <div className="col-lg-12">
                <div className="row news-date-time mt-2">
                  <div className="col-7 d-flex pe-1" />
                  <div className="col-5 ps-1 d-flex justify-content-end">
                    <p className="mb-0">
                      <span className="date me-1">{formattedDate}</span>
                      <span className="time">{timeAgoText}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {more && customItemIndex === obj.length - 1 && (
              <RenderMoreLink type={type} locale={locale} />
            )}
          </div>
        );
      })
    : null;
}
