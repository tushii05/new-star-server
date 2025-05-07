"use client";
import React, { useEffect, useState } from "react";
import { createSavedPost } from "@/services/user.service";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function BookmarkPost({
  width,
  height,
  type,
  saved,
  articleId,
}) {
  const { data: session, status } = useSession();
  const [isSaved, setIsSaved] = useState(saved);
  const router = useRouter();

  useEffect(() => {
    setIsSaved(saved);
  }, [saved]);

  const handleSaved = async (e) => {
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    if (!session?.user) return; // exit if user is not logged in

    try {
      const res = await createSavedPost({
        post_id: articleId,
        user_id: session?.user?.id,
      });
      if (res?.data?.status === "saved") {
        setIsSaved(true);
      } else {
        setIsSaved(false);
      }
      router.refresh();
    } catch (error) {}
  };

  // Ensure session is fully loaded
  if (status === "loading") return null;

  const renderBookmarkButton = () => {
    const isPostSaved = isSaved ? "#fff" : "none";

    const commonSvgProps = {
      xmlns: "http://www.w3.org/2000/svg",
      stroke: "white",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    };

    if (type === "article") {
      return (
        <button
          className="btn btn-primary me-2 btn-bookmark"
          onClick={handleSaved}
        >
          <svg
            width={width ?? 13}
            height={height ?? 17}
            viewBox="0 0 13 17"
            fill={isPostSaved}
            {...commonSvgProps}
          >
            <path
              d="M10.3086 1.39045H2.69141C1.99026 1.39045 1.42188 1.98726 1.42188 2.72346V15.6092L6.5 12.0545L11.5781 15.6092V2.72346C11.5781 1.98726 11.0098 1.39045 10.3086 1.39045Z"
              strokeWidth="1.58967"
            />
          </svg>
        </button>
      );
    }

    return (
      <span className="bookmark" onClick={handleSaved}>
        <svg
          width={width ?? 10}
          height={height ?? 14}
          viewBox="0 0 10 14"
          fill={isPostSaved}
          {...commonSvgProps}
        >
          <path
            d="M8.12492 1.16653H1.87492C1.29962 1.16653 0.833252 1.65623 0.833252 2.26028V12.8332L4.99992 9.91653L9.16659 12.8332V2.26028C9.16659 1.65623 8.70025 1.16653 8.12492 1.16653Z"
            strokeWidth="1.30435"
          />
        </svg>
      </span>
    );
  };

  // Render only if user is logged in
  return session?.user ? renderBookmarkButton() : null;
}
