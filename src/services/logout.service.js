const logoutService = async (formData) => {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/api/user/logout`, {
      method: "POST",
    });
    if (!res.ok) {
      throw new Error("Failed to Logout");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error Logout:", error);
    return error;
  }
};

export default logoutService;
