"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { getAllEpaper } from "@/services/epaper.service";
import EPaperCard from "@/components/epaper/EPaperCard";

export default function LoadMoreEpaper({ params, date }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView();
  const { locale } = params;

  const loadMorePosts = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const { epaper } = await getAllEpaper(page, 10, date || "");
      if (epaper?.length > 0) {
        setData((prev) => [...prev, ...epaper]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error loading epaper:", error);
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
        ? data.map((paper, index) => (
            <EPaperCard paper={paper} key={index} locale={locale} />
          ))
        : null}
      <div ref={ref} className="text-center my-4">
        {loading ? "Loading..." : null}
      </div>
    </>
  );
}
