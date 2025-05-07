"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import WebStoryCard from "@/components/cards/webStoryCard";
import { getAllWebStories } from "@/services/webstory.service";

export default function LoadMoreWebStory({ params }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView();
  const { locale } = params;

  const loadMorePosts = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const { web_stories } = await getAllWebStories(page, 5);
      if (web_stories?.length > 0) {
        setData((prev) => [...prev, ...web_stories]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error loading web story:", error);
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
      {data?.length
        ? data.map((story, index) => (
            <WebStoryCard story={story} locale={locale} key={index} />
          ))
        : null}
      <div ref={ref} className="text-center my-4">
        {loading ? "Loading..." : null}
      </div>
    </>
  );
}
