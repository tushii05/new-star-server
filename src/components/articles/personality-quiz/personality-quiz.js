"use client";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import PersonalityQuizImage from "./personality-quiz-image";
import PersonalityQuizText from "./personality-quiz-text";
import { getMediaUrl } from "@/utils/getUrl";
import dynamic from "next/dynamic";
const HtmlContent = dynamic(() => import("@/utils/htmlContent"));

export default function PersonalityQuiz({ personalityQuiz }) {
  const [answerData, setAnswerData] = useState({});

  const checkType = useCallback(
    (type, pAns, quizAnsIndex) => {
      const props = { pAns, setAnswerData, answerData, quizAnsIndex };
      const components = {
        small_image: (
          <PersonalityQuizImage col={4} {...props} key={quizAnsIndex} />
        ),
        large_image: (
          <PersonalityQuizImage col={6} {...props} key={quizAnsIndex} />
        ),
        text: <PersonalityQuizText {...props} key={quizAnsIndex} />,
      };

      return components[type] || null;
    },
    [setAnswerData, answerData]
  );

  return (
    <>
      {personalityQuiz?.length
        ? personalityQuiz.map((pQuiz, pIndex) => (
            <div key={pIndex}>
              <div className="text-poll-descreption personality-quiz">
                <div className="detail-div">
                  <h4 className="news-card-heading mt-3">
                    {pIndex + 1}. {pQuiz?.question}
                  </h4>
                  {pQuiz?.image_path && (
                    <Image
                      width={1000}
                      height={1000}
                      src={getMediaUrl(pQuiz.image_path)}
                      alt={pQuiz.title ?? "article"}
                      className="img-fluid h-100"
                      loading="lazy"
                    />
                  )}
                  <div className="row mt-4 poll-image">
                    {pQuiz?.quiz_answers?.length
                      ? pQuiz?.quiz_answers?.map((pAns, pAnsIndex) =>
                          checkType(pQuiz?.answer_format, pAns, pAnsIndex)
                        )
                      : null}
                  </div>
                  {answerData && (
                    <div className="row mt-5">
                      <h4 className="fw-bold">{answerData?.result_title}</h4>
                      <HtmlContent data={answerData?.description} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        : null}
      {/* <div className="row mt-4 pb-5">
        <div className="col-lg-12 d-flex justify-content-center align-items-center">
          <button className="btn btn-primary px-4">Play Again ↻</button>
        </div>
      </div> */}
    </>
  );
}
