"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
const MeduimCard = dynamic(() => import("@/components/cards/MeduimCard"));
import getLanguageId from "@/utils/langId";
import { useSession } from "next-auth/react";
import Loader from "../loader/loader";

const getFunctional = async (slug, type, nextPage, locale, userId) => {
  const lang_id = await getLanguageId(locale);
  switch (type) {
    case "category": {
      const module = await import("@/services/category.service");
      const getCategoriesPosts = module.getCategoriesPosts;
      return await getCategoriesPosts(slug, nextPage, 10, lang_id);
    }
    case "saved": {
      const module = await import("@/services/user.service");
      const getSavedPost = module.getSavedPost;
      return await getSavedPost(userId, nextPage, 10);
    }
    case "search": {
      const module = await import("@/services/search.service");
      const getPostByTitle = module.getPostByTitle;
      return await getPostByTitle(lang_id, nextPage, 10, slug, "", "");
    }
    case "video": {
      const module = await import("@/services/search.service");
      const getPostByTitle = module.getPostByTitle;
      return await getPostByTitle(lang_id, nextPage, 10, "", "video", "");
    }
    case "tag": {
      const module = await import("@/services/search.service");
      const getPostByTitle = module.getPostByTitle;
      return await getPostByTitle(lang_id, nextPage, 10, "", "", slug);
    }
    default:
      throw new Error(`Invalid type: ${type}`);
  }
};

export default function LoadMoreCategoryPost({ type, params }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView();
  const { slug, locale } = params;
  const session = useSession();
  const userId = session?.data?.user?.id;

  const loadMorePosts = async () => {
    if (loading) return; // Prevent multiple simultaneous requests
    setLoading(true);

    const nextPage = page + 1;
    const newPosts = await getFunctional(slug, type, nextPage, locale, userId);

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
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight - 200; // 200px above page bottom

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
      {data?.length
        ? data?.map((post, index) => (
            <MeduimCard
              post={post}
              key={index + post?.id + Math.random()}
              className="col-lg-6 col-md-6 bdr-bottom-1"
              locale={locale}
              saved={type === "saved"}
            />
          ))
        : null}
      <div ref={ref} className="text-center my-4">
        {loading ? <Loader /> : null}
      </div>
    </>
  );
}
