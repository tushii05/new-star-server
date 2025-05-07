import Image from "next/image";

export default function PersonalityQuizText({
  pAns,
  answerData,
  setAnswerData,
  quizAnsIndex,
}) {
  const answerDataId = answerData?.id;

  return (
    <div
      className="col-lg-12 mb-3"
      onClick={() =>
        setAnswerData({ ...pAns?.quiz_result, index: quizAnsIndex })
      }
    >
      <div className="bg-secondary">
        <div className="form-check form-check-inline ps-0 ms-3">
          <div className="d-flex poll-option">
            {pAns?.quiz_result?.id === answerDataId &&
            quizAnsIndex === answerData?.index ? (
              <div className="circle-success">
                <i>
                  <Image
                    src="/images/icon/succes-icon.svg"
                    height={20}
                    width={20}
                    alt="succes-icon"
                    priority
                  />
                </i>
              </div>
            ) : (
              <div className="circle-default" />
            )}
            {pAns?.answer_text}
          </div>
        </div>
      </div>
    </div>
  );
}
