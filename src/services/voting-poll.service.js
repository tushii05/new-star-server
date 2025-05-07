const votingPoll = async (body) => {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/api/polls/vote`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      throw new Error("Failed to Vote for voting poll");
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error Vote for voting poll:", error);
    return error;
  }
};

const postPoll = async (body) => {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/api/posts/pollVote`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Failed to Vote for voting poll");
    }
    import("sonner").then((module) => module.toast(data.data.message));
    return data.data;
  } catch (error) {
    console.error("Error Vote for voting poll:", error);
    return error;
  }
};
export { votingPoll, postPoll };
