"use client";

import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { getUserPosts } from "@/services/user.service";
import Loader from "@/components/loader/loader";
import MeduimCard from "@/components/cards/MeduimCard";

export default function LoadMoreUsersPost({ user, params }) {
  const { userProfile, locale } = params;
  const [data, setData] = useState([]);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const loadMorePosts = useCallback(
    debounce(async () => {
      if (loading || isFinished) return;

      setLoading(true);
      try {
        const {
          data: newPosts,
          currentPage,
          totalPages,
        } = await getUserPosts(userProfile, page, 10);
        setIsFinished(currentPage === totalPages);

        if (newPosts?.posts?.length > 0) {
          const userPostManipulate = newPosts?.posts?.map((item) => {
            return {
              ...item,
              user: { username: user?.username, slug: userProfile },
            };
          });
          setData((prev) => [...prev, ...userPostManipulate]);
          setPage((prevPage) => prevPage + 1);
        }
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setLoading(false);
      }
    }, 0),
    [loading, isFinished, page]
  );

  useEffect(() => {
    if (inView) loadMorePosts();
  }, [inView, loadMorePosts]);
  return (
    <>
      {data.map((post, index) => (
        <MeduimCard
          post={post}
          key={index + post?.id + Math.random()}
          className="col-lg-6 col-md-6 bdr-bottom-1"
          locale={locale}
          saved={false}
        />
      ))}
      <div ref={ref} className="text-center my-4">
        {!isFinished && loading && <Loader />}
      </div>
    </>
  );
}
