// "use server";

const typeBasedData = async (slug, langId, page, pageSize, userId) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/api/posts/post?identifier=${decodeURI(
        slug
      )}&langId=${langId}&page=${page}&pageSize=${pageSize}&userId=${userId}`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch type based data");
    }

    const data = await res.json();
    const type = data?.data?.type;

    if (type === "category") {
      return {
        type: type,
        data: { ...data?.data?.category, posts: data?.data?.posts },
      };
    } else if (type === "page") {
      return {
        type: type,
        data: data?.data?.pageData,
      };
    } else if (type === "post") {
      return {
        type: type,
        data: data?.data,
      };
    }
    return { type: type, data: data?.data?.data };
  } catch (error) {
    console.error("Error fetching type based data:", error);
    return { type: null, data: null };
  }
};
export { typeBasedData };
