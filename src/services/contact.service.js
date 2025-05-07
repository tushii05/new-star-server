"use server";

const contactService = async (formData) => {
  const module = await import("sonner");
  const toast = module.toast;
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/api/contact`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Failed to Contact");
    }
    toast(data?.message);
    return data;
  } catch (error) {
    console.error("Error Contact:", error);
    return error;
  }
};

export { contactService };
