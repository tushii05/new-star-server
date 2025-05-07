
export default function PollText({
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
    <div className="col-lg-12 mb-3" onClick={handleClick}>
      <div className="form-check form-check-inline ps-0 ms-0 w-100">
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${pollAns?.percentage}%` }}
            aria-valuenow={pollAns?.percentage}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <span className="strokeme">{pollAns?.percentage}%</span>
          </div>
        </div>
        <div
          className="d-flex poll-option poll-option-two"
          style={{
            textShadow:
              "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
          }}
        >
          {isOptionClicked ? (
            <div className="circle-success">
              <i>
                <svg
                  height="20"
                  width="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#00aa26"
                >
                  <path
                    d="M4 12.6111L8.92308 17.5L20 6.5"
                    stroke="#00aa26"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
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
