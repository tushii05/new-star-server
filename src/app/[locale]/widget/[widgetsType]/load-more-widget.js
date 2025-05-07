"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { getWidgetsByType } from "@/services/widgets.service";
import Custom from "@/components/widgets/custom";
import { VotingPollContent } from "@/components/widgets/voting-poll/voting-poll";
import { PopularPostContent } from "@/components/widgets/popular-post";
import { PopularTagsContent } from "@/components/widgets/popular-tags";

export default function LoadMoreWidget({ lang_id, params }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView();
  const { widgetsType, locale } = params;

  const componentMap = {
    custom: Custom,
    poll: VotingPollContent,
    tags: PopularTagsContent,
    "popular-posts": PopularPostContent,
    "recommended-posts": PopularPostContent,
  };

  const WidgetComponent = componentMap[widgetsType.toLowerCase()];

  const loadMorePosts = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const newPosts = await getWidgetsByType(lang_id, widgetsType, page, 10);
      if (newPosts?.data?.length > 0) {
        setData((prev) => [...prev, ...newPosts.data]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error loading widgets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inView) loadMorePosts();
  }, [inView]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight - 200;

      if (scrollPosition >= threshold && !loading) {
        loadMorePosts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  return (
    <>
      {WidgetComponent ? (
        <WidgetComponent
          data={{
            obj: data,
            title: widgetsType,
            more: false,
            type: widgetsType,
          }}
          locale={locale}
          cardType
        />
      ) : (
        <div className="text-center my-4">Invalid widget type</div>
      )}
      <div ref={ref} className="text-center my-4">
        {loading ? "Loading..." : null}
      </div>
    </>
  );
}
