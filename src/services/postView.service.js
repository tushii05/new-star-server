"use server";
const postViewService = async (postViewBody) => {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/api/posts/views`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(postViewBody),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to Counting views");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error Counting views:", error);
    return error;
  }
};

export default postViewService;
