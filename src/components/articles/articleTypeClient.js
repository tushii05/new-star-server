"use client";
import { useMemo } from "react";
import dynamic from "next/dynamic";
const Audio = dynamic(() => import("./audio/audio"));
const TriviaQuiz = dynamic(() => import("./trivia-quiz/trivia-quiz"));
const PersonalityQuiz = dynamic(() =>
  import("./personality-quiz/personality-quiz")
);
const Poll = dynamic(() => import("./poll/poll"));
const SortedList = dynamic(() => import("./sorted-list/sorted-list"));
const TableOfContent = dynamic(() =>
  import("./table-of-content/table-of-content")
);
const Video = dynamic(() => import("./video/video"));

export default function ArticleTypeClient({
  postType,
  article,
  triviaQuiz,
  pollItem,
  sortedList,
  tableOfContents,
  personalityQuiz,
  video,
  locale,
  slug,
}) {
  const RenderPostType = useMemo(() => {
    if (!postType) return null;

    const postComponents = {
      audio: <Audio tracks={article?.post_audios} />,
      video: <Video video={video} />,
      trivia_quiz: <TriviaQuiz triviaQuiz={triviaQuiz} />,
      personality_quiz: <PersonalityQuiz personalityQuiz={personalityQuiz} />,
      poll: <Poll pollItem={pollItem} post_id={article?.id} />,
      sorted_list: <SortedList sortedList={sortedList} />,
      table_of_contents: (
        <TableOfContent
          tableOfContents={tableOfContents}
          locale={locale}
          link_list_style={article?.link_list_style}
          slug={slug}
        />
      ),
    };

    return postComponents[postType];
  }, [
    postType,
    article,
    triviaQuiz,
    pollItem,
    sortedList,
    tableOfContents,
    locale,
  ]);

  return <>{RenderPostType}</>;
}
