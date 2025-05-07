"use client";
import { votingPoll } from "@/services/voting-poll.service";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PollButton({ poll, pollIndex }) {
  const session = useSession();
  const [showError, setShowError] = useState(false);
  const user_id = session?.data?.user?.id;
  const [voteOption, setVoteOption] = useState("");
  const router = useRouter();

  const handleVoteSubmit = async () => {
    if (!voteOption) {
      setShowError(true);
    }
    const res = await votingPoll({
      user_id: user_id ?? 0,
      poll_id: poll?.id,
      vote: voteOption,
    });
    setShowError(res?.message);
    router.refresh();
  };

  useEffect(() => {
    if (voteOption) {
      setShowError(false);
    }
  }, [voteOption]);

  return (
    <div>
      {Object.entries(poll).map(
        ([key, value], index) =>
          key.includes("option") &&
          value !== null && (
            <div className="form-check mt-2" key={index}>
              <input
                className="form-check-input custom-radio position-relative"
                type="radio"
                name={poll?.question}
                id={key + pollIndex}
                value={key}
                onChange={(e) => setVoteOption(e.target.value)}
              />
              <label
                className="form-check-label mt-0 pt-1 ms-2"
                htmlFor={key + pollIndex}
              >
                {value}
              </label>
            </div>
          )
      )}
      {showError && (
        <span className="text-danger mb-0">
          {showError ?? "Select the option to vote"}
        </span>
      )}
      <div className="mt-4">
        <button className="btn btn-primary px-4" onClick={handleVoteSubmit}>
          Vote
        </button>
        <span
          className="btn btn-outline-dark ms-2 collapsed"
          data-bs-toggle="collapse"
          data-bs-target={"#voteDetails" + pollIndex}
          role="button"
          aria-expanded="false"
          aria-controls={"voteDetails" + pollIndex}
        >
          View Details
        </span>
      </div>
    </div>
  );
}
