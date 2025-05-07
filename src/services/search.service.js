// "use server";
const getPostByTitle = async (
  langId,
  page,
  pageSize,
  title,
  post_type,
  tag
) => {
  try {
    const resUser = await fetch(
      `${process.env.NEXT_API_URL}/api/posts?langId=${langId}&title=${title}&tag=${tag}&page=${page}&pageSize=${pageSize}&post_type=${post_type}`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!resUser.ok) {
      throw new Error("Failed to fetch by title");
    }

    const data = await resUser.json();
    return data?.data;
  } catch (error) {
    console.error("Error fetching  by title:", error);
    return [];
  }
};

export { getPostByTitle };
