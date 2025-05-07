import dynamic from "next/dynamic";
const PollButton = dynamic(() => import("./poll-button"));
const RenderMoreLink = dynamic(() => import("../renderMoreLink"));
export const VotingPollContent = ({ data, locale }) => {
  const { obj, more, type } = data;

  return obj.map((poll, pollIndex) => (
    <div
      key={pollIndex}
      className="bdr py-3 accordion accordion-flush position-relative"
      id="accordionFlushExample"
    >
      <div className="row votting-poll">
        <div className="col-12">
          <p className="mb-2">{poll?.question}</p>
          <PollButton poll={poll} pollIndex={pollIndex} />
        </div>
      </div>
      <div
        className="row votting-poll pt-2 collapse"
        id={"voteDetails" + pollIndex}
        data-bs-parent="#accordionFlushExample"
      >
        <p className="mb-2 text-start fw-bold">{poll?.question}</p>
        <p className="mb-2 pb-2 text-center fw-bold">
          Total Vote: {poll?.totalVotes}
        </p>
        {poll?.votes?.map((pollResult, pollResultIndex) => (
          <div className="col-12 mb-2 py-2" key={pollResultIndex}>
            <p className="mb-2">{pollResult?.option}</p>
            <div className="progress position-relative">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: pollResult?.percentage + "%" }}
                aria-valuenow={0}
                aria-valuemin={0}
                aria-valuemax={100}
              />
              <span className="percentage-value position-absolute end-0 fw-bold">
                {pollResult?.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
      {more && pollIndex === obj?.length - 1 && (
        <RenderMoreLink type={type} locale={locale} />
      )}
    </div>
  ));
};
export default function VotingPoll({ data, locale }) {
  const { obj, title } = data;

  return obj?.length ? (
    <>
      <div className="row">
        <div className="col-5">
          <h2 className="sec-heading text-dark text-uppercase mb-0">{title}</h2>
        </div>
      </div>
      <VotingPollContent data={data} locale={locale} />
      {/* {obj.map((poll, pollIndex) => (
        <div
          key={pollIndex}
          className="bdr py-3 accordion accordion-flush position-relative"
          id="accordionFlushExample"
        >
          <div className="row votting-poll">
            <div className="col-12">
              <p className="mb-2">{poll?.question}</p>
              <PollButton poll={poll} pollIndex={pollIndex} />
            </div>
          </div>
          <div
            className="row votting-poll pt-2 collapse"
            id={"voteDetails" + pollIndex}
            data-bs-parent="#accordionFlushExample"
          >
            <p className="mb-2 text-start fw-bold">{poll?.question}</p>
            <p className="mb-2 pb-2 text-center fw-bold">
              Total Vote: {poll?.totalVotes}
            </p>
            {poll?.votes?.map((pollResult, pollResultIndex) => (
              <div className="col-12 mb-2 py-2" key={pollResultIndex}>
                <p className="mb-2">{pollResult?.option}</p>
                <div className="progress position-relative">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: pollResult?.percentage + "%" }}
                    aria-valuenow={0}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                  <span className="percentage-value position-absolute end-0 fw-bold">
                    {pollResult?.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
          {more && pollIndex === obj?.length - 1 && (
            <RenderMoreLink type={type} locale={locale} />
          )}
        </div>
      ))} */}
    </>
  ) : null;
}
