"use server";

const getAllEpaper = async (page, pageSize, date) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/api/epepar?page=${page}&pageSize=${pageSize}&epaper_date=${date}`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch articles");
    }
    const data = await res.json();
    return { epaper: data?.data?.epaper || [] };
  } catch (error) {
    console.error("Error fetching articles:", error);
  }
};

const getByIdEpaper = async (id) => {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/api/epepar/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch epaper by id");
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching epaper by id:", error);
  }
};

export { getAllEpaper, getByIdEpaper };
