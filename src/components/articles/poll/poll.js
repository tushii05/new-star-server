"use client";
import Image from "next/image";
import React, { useCallback, useMemo, useState } from "react";
import PollImage from "./poll-image";
import PollText from "./poll-text";
import { postPoll } from "@/services/voting-poll.service";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getMediaUrl } from "@/utils/getUrl";
import dynamic from "next/dynamic";
const HtmlContent = dynamic(() => import("@/utils/htmlContent"));

export default function Poll({ pollItem, post_id }) {
  const router = useRouter();
  const session = useSession();
  const user = session?.data?.user;
  const [isClicked, setIsClicked] = useState([]);

  // handleVote function wrapped in useCallback to avoid re-creation
  const handleVote = useCallback(
    async (question_id, answer_id) => {
      try {
        const user_id = user?.id;
        await postPoll({
          post_id,
          question_id,
          answer_id,
          user_id: user_id ?? 0,
        });

        router.refresh();
      } catch (error) {}
    },
    [user, post_id, router]
  );

  // Check type of answer and render appropriate component
  const checkType = useCallback(
    (type, pollAns, pollAnsIndex, queId) => {
      const props = { pollAns, handleVote, queId, isClicked, setIsClicked };
      const components = {
        small_image: <PollImage col={4} {...props} key={pollAnsIndex} />,
        large_image: <PollImage col={6} {...props} key={pollAnsIndex} />,
        text: <PollText {...props} key={pollAnsIndex} />,
      };

      return components[type] || null;
    },
    [handleVote, isClicked]
  );

  // Memoize poll rendering to prevent unnecessary re-renders
  const pollItems = useMemo(() => {
    return pollItem?.length
      ? pollItem.map((poll, index) => (
          <div className="image-poll-with-progressbar" key={index}>
            <div className="featured-img mt-3">
              <h4 className="news-card-heading mt-3">
                {index + 1}. {poll?.question}
              </h4>
              <HtmlContent data={poll?.description} />
              {poll?.image_path && (
                <Image
                  width={1000}
                  height={1000}
                  src={getMediaUrl(poll.image_path)}
                  alt={poll.title ?? "article"}
                  className="img-fluid"
                  loading="lazy"
                />
              )}
            </div>
            <div className="row mt-5 pt-4 poll-image ">
              {poll?.quiz_answers?.length
                ? poll?.quiz_answers.map((pollAns, pollAnsIndex) =>
                    checkType(
                      poll?.answer_format,
                      pollAns,
                      pollAnsIndex,
                      poll?.id
                    )
                  )
                : null}
            </div>
            <div>Total Votes: {poll?.total_votes}</div>
          </div>
        ))
      : null;
  }, [pollItem, checkType]);

  return <>{pollItems}</>;
}
