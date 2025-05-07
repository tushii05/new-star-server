"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import RelatedPostCard from "./related-post-card";
import { getCategoriesPosts } from "@/services/category.service";
import { getPostByTitle } from "@/services/search.service";
import Loader from "../loader/loader";

export default function LoadMoreRelatedPost({ slug, locale, lang_id }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView();

  const loadMorePosts = async () => {
    if (loading) return; // Avoid multiple triggers
    setLoading(true);

    const nextPage = page + 1;
    // const newPosts = await getCategoriesPosts(slug, nextPage, 2, lang_id);
    // const moreData = await getPostByTitle(lang_id, nextPage, 2);
    let newPosts = await getCategoriesPosts(slug, nextPage, 2, lang_id);

    if (!newPosts?.posts?.length) {
      // If `getCategoriesPosts` returns no data, call `getPostByTitle`
      newPosts = await getPostByTitle(lang_id, nextPage, 2, "", "", "");
    }
    if (newPosts?.posts?.length > 0) {
      setData((prev) => [...prev, ...newPosts.posts]);
      setPage(nextPage);
    }

    setLoading(false);
  };

  // Trigger loadMorePosts when the observed element is in view
  useEffect(() => {
    if (inView) {
      loadMorePosts();
    }
  }, [inView]);

  // Detect when the user scrolls near the bottom of the page
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY; // Bottom of the viewport
      const threshold = document.body.offsetHeight - 200; // 200px above the page bottom

      if (scrollPosition >= threshold) {
        loadMorePosts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, page]); // Dependencies include loading and page to ensure updates

  return (
    <>
      <RelatedPostCard posts={data} locale={locale} from="initial" />
      <div ref={ref} className="text-center my-4">
        {loading ? <Loader /> : null}
      </div>
    </>
  );
}
