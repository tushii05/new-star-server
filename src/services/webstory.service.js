"use server";
const getAllWebStories = async (page, pageSize) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/api/web_stories?page=${page}&pageSize=${pageSize}`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch all webstories");
    }
    const data = await res.json();
    return { web_stories: data.data.web_stories };
  } catch (error) {
    console.error("Error fetching all webstories:", error);
    return { web_stories: [] };
  }
};

const getWebStories = async (id) => {
  try {
    const resArticle = await fetch(
      `${process.env.NEXT_API_URL}/api/web_stories/${id}`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!resArticle.ok) {
      throw new Error("Failed to fetch web stories");
    }
    const data = await resArticle.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching web stories:", error);
    return null;
  }
};
export { getAllWebStories, getWebStories };
