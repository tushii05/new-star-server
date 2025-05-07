"use client";
import Image from "next/image";
import React, { useEffect, useState, useMemo } from "react";
import TriviaQuizText from "./trivia-quiz-text";
import TriviaQuizLargeImage from "./trivia-quiz-large-image";
import TriviaQuizSmallImage from "./trivia-quiz-small-image";
import { getMediaUrl } from "@/utils/getUrl";

const SuccessIcon = ({ color }) => (
  <svg
    height="20"
    width="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke={color}
  >
    <path
      d="M4 12.6111L8.92308 17.5L20 6.5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ErrorIcon = ({ color }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 8L8 16M8.00001 8L16 16"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function TriviaQuiz({ triviaQuiz }) {
  const [modifiedQuiz, setModifiedQuiz] = useState([]);
  const [result, setResult] = useState({
    winCount: 0,
    loseCount: 0,
    isShow: false,
  });

  useEffect(() => {
    if (triviaQuiz?.length) {
      const initializedQuiz = triviaQuiz.map((item) => ({
        ...item,
        clicked: false,
        isRightAns: null,
      }));
      setModifiedQuiz(initializedQuiz);
    }
  }, [triviaQuiz]);

  const handlePlayQuiz = (quizIndex, isRightAns) => {
    const updatedQuiz = modifiedQuiz.map((quiz, index) =>
      index === quizIndex ? { ...quiz, clicked: true, isRightAns } : quiz
    );

    setModifiedQuiz(updatedQuiz);
  };

  const winCount = useMemo(
    () => modifiedQuiz.filter((quiz) => quiz.isRightAns).length,
    [modifiedQuiz]
  );
  const loseCount = useMemo(
    () =>
      modifiedQuiz.filter((quiz) => quiz.clicked && !quiz.isRightAns).length,
    [modifiedQuiz]
  );

  useEffect(() => {
    if (modifiedQuiz.some((quiz) => quiz.clicked)) {
      setResult({ winCount, loseCount, isShow: true });
    }
  }, [winCount, loseCount, modifiedQuiz]);

  const handlePlayAgain = () => {
    setModifiedQuiz(
      modifiedQuiz.map((quiz) => ({
        ...quiz,
        clicked: false,
        isRightAns: null,
      }))
    );
    setResult({ winCount: 0, loseCount: 0, isShow: false });
  };

  const checkAns = (isCorrect, clicked, isRightAns) => {
    if (!clicked) return <div className="circle-default" />;

    // Check if the answer is correct
    if (isCorrect) {
      return (
        <div className="circle-success">
          <i>
            <SuccessIcon color="#00aa26" />
          </i>
        </div>
      );
    }

    // Check if the answer is incorrect but matches the right answer logic
    if (!isCorrect && isCorrect === isRightAns) {
      return (
        <div className="circle-danger">
          <i>
            <ErrorIcon color="#F44336" />
          </i>
        </div>
      );
    }
    return <div className="circle-default" />;
  };

  const quizType = (type, quiz, quiz_ans, quiz_ans_index, index) => {
    const props = {
      key: quiz_ans_index,
      quiz,
      quiz_ans,
      quiz_ans_index,
      index,
      checkAns,
      handlePlayQuiz,
    };

    const components = {
      small_image: <TriviaQuizSmallImage {...props} />,
      large_image: <TriviaQuizLargeImage {...props} />,
      text: <TriviaQuizText {...props} />,
    };

    return components[type] || null;
  };

  return (
    <>
      {modifiedQuiz.map((quiz, index) => (
        <div className="image-poll border-bottom" key={index}>
          <div className="featured-img mt-3">
            <h4 className="news-card-heading mt-3">
              {index + 1}. {quiz?.question}
            </h4>
            {quiz?.image_path && (
              <Image
                width={1000}
                height={1000}
                src={getMediaUrl(quiz.image_path)}
                alt={quiz.title ?? "article"}
                className="img-fluid"
                loading="lazy"
              />
            )}
          </div>
          <div className="row mt-4 poll-image">
            {quiz?.quiz_answers.map((quiz_ans, quiz_ans_index) =>
              quizType(
                quiz?.answer_format,
                quiz,
                quiz_ans,
                quiz_ans_index,
                index
              )
            )}
          </div>
          {quiz?.clicked ? (
            <div
              className={`alert d-flex align-items-center fw-bold border-0 ${
                quiz?.isRightAns ? `alert-success` : `alert-danger`
              }`}
              role="alert"
            >
              {quiz?.isRightAns ? (
                <SuccessIcon color="#00771b" />
              ) : (
                <ErrorIcon color="#842029" />
              )}

              <div className="ms-2">
                {quiz?.isRightAns ? "Right Answer" : "Wrong Answer"}
              </div>
            </div>
          ) : null}
        </div>
      ))}

      {result.isShow && (
        <div className="">
          <div className="poll-result">
            <div className="row d-flex justify-content-center align-items-center poll-answer mt-5 pt-5">
              <div className="col-4">
                <div
                  className="alert alert-danger d-flex align-items-center fw-bold border-0 mb-3 d-flex justify-content-center"
                  role="alert"
                >
                  <div className="ms-2">Wrong Answer: {result.loseCount}</div>
                </div>
              </div>
              <div className="col-4">
                <div
                  className="alert alert-success d-flex align-items-center fw-bold border-0 mb-3 d-flex justify-content-center"
                  role="alert"
                >
                  <div className="ms-2">Currect Answer: {result.winCount}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4 pb-5">
            <div className="col-lg-12 d-flex justify-content-center align-items-center">
              <button
                className="btn btn-primary px-4"
                onClick={handlePlayAgain}
                type="button"
              >
                Play Again ↻
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
