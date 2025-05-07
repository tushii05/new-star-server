import { getMediaUrl } from "@/utils/getUrl";
import Image from "next/image";
import React from "react";

export default function TriviaQuizSmallImage({
  quiz,
  index,
  quiz_ans,
  quiz_ans_index,
  checkAns,
  handlePlayQuiz,
}) {
  return (
    <div className="col-4 mb-3 " key={quiz_ans_index}>
      <div className="bg-secondary">
        <div className="form-check ps-0 ms-0 bg-secondary">
          {quiz_ans?.image_path && (
            <Image
              width={1000}
              height={1000}
              src={getMediaUrl(quiz_ans.image_path)}
              alt={quiz_ans.title ?? "article"}
              className="img-fluid h-100"
              loading="lazy"
            />
          )}

          <div
            className={`d-flex poll-option ps-lg-2 pb-2 ${
              quiz_ans?.image_path ? `` : `pt-2`
            }`}
            onClick={() => handlePlayQuiz(index, quiz_ans.is_correct)}
          >
            {checkAns(quiz_ans.is_correct, quiz.clicked, quiz.isRightAns)}
            {quiz_ans?.answer_text}
          </div>
        </div>{" "}
      </div>
    </div>
  );
}
