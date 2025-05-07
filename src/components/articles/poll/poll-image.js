import { getMediaUrl } from "@/utils/getUrl";
import Image from "next/image";

export default function PollImage({
  col,
  pollAns,
  handleVote,
  queId,
  isClicked,
  setIsClicked,
}) {
  const id = `${queId}_${pollAns?.id}`; // Unique ID combining question and answer IDs

  // Check if the user has already voted for this question
  const hasVoted = Boolean(isClicked[queId]); // True if a vote has been cast for this question

  // Handle click to select only one option at a time
  const handleClick = () => {
    if (!hasVoted) {
      // Prevent further clicks after voting
      setIsClicked({ ...isClicked, [queId]: id }); // Mark this option as clicked for the question
      handleVote(queId, pollAns?.id); // Cast the vote
    }
  };

  // Check if the current answer is the one that was clicked
  const isOptionClicked = isClicked[queId] === id;

  return (
    <div
      className={`col-lg-${col} mb-3`}
      onClick={handleClick}
      style={{ cursor: hasVoted ? "default" : "pointer" }} // Disable pointer cursor if voted
    >
      <div className="form-check form-check-inline ps-0 ms-0">
        {pollAns?.image_path && (
          <Image
            width={1000}
            height={1000}
            src={getMediaUrl(pollAns.image_path)}
            alt={pollAns.title ?? "article"}
            className="img-fluid h-100"
            loading="lazy"
          />
        )}

        <div className="progress">
          <div
            className="progress-bar "
            role="progressbar"
            style={{
              width: +pollAns?.percentage + "%",
            }}
            aria-valuenow={pollAns?.percentage}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <span className="strokeme">{+pollAns?.percentage}%</span>
          </div>
        </div>

        <div
          className="d-flex poll-option"
          style={{
            textShadow:
              "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
          }}
        >
          {isOptionClicked ? (
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
          <span>{pollAns?.answer_text}</span>
        </div>
      </div>
    </div>
  );
}
