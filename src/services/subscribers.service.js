const subscribers = async (postViewBody) => {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/api/subscribers`, {
      method: "POST",
      body: JSON.stringify(postViewBody),
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await res.json();
    if (!res.ok) {
      import("sonner").then((module) => module.toast.error(data?.message));
      throw new Error("Failed to subscribers");
    }
    import("sonner").then((module) => module.toast(data?.message));
    return data;
  } catch (error) {
    console.error("Error subscribers:", error);
    return error;
  }
};

export default subscribers;
