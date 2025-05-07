import { getMediaUrl } from "@/utils/getUrl";
import Image from "next/image";

export default function PersonalityQuizImage({
  col,
  pAns,
  answerData,
  setAnswerData,
  quizAnsIndex,
}) {
  const answerDataId = answerData?.id;
  return (
    <div
      className={`col-lg-${col} mb-3`}
      onClick={() =>
        setAnswerData({ ...pAns?.quiz_result, index: quizAnsIndex })
      }
    >
      <div className="form-check ps-0 ms-0">
        {pAns?.image_path && (
          <Image
            width={1000}
            height={1000}
            src={getMediaUrl(pAns.image_path)}
            alt={pAns.result_title ?? "article"}
            className="img-fluid h-100"
            loading="lazy"
          />
        )}
      </div>
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
