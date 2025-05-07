// "use server";

const postCommentService = async (formData) => {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/api/posts/comment`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to Comment");
    }

    const data = await res.json();
    import("sonner").then((module) => module.toast("Commented Posted"));
    return data;
  } catch (error) {
    console.error("Error Comment:", error);
    return error;
  }
};

const deleteCommentService = async (comment_id, user_id) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/api/posts/comment/delete/${comment_id}/${user_id}`,
      {
        method: "DELETE",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to Delete Comment");
    }
    const data = await res.json();
    import("sonner").then((module) => module.toast("Commented Deleted"));
    return data;
  } catch (error) {
    console.error("Error Delete Comment:", error);
    return error;
  }
};

export { postCommentService, deleteCommentService };
