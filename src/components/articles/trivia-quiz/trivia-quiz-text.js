import React from "react";

export default function TriviaQuizText({
  quiz,
  index,
  quiz_ans,
  quiz_ans_index,
  checkAns,
  handlePlayQuiz,
}) {
  return (
    <div class="col-lg-4 mb-3" key={quiz_ans_index}>
      <div class="bg-secondary">
        <div class="form-check form-check-inline ps-0 ms-3 ">
          <div
            className="d-flex poll-option mb-1"
            onClick={() => handlePlayQuiz(index, quiz_ans.is_correct)}
          >
            {checkAns(quiz_ans.is_correct, quiz.clicked, quiz.isRightAns)}
            {quiz_ans?.answer_text}
          </div>
        </div>
      </div>
    </div>
  );
}
