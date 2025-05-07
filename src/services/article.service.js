"use server";

const articleService = async (slug, id) => {
  try {
    const resArticle = await fetch(
      `${process.env.NEXT_API_URL}/api/posts/data/${slug}/${id}`,
      { cache: "no-store" }
    );
    if (!resArticle.ok) {
      throw new Error("Failed to fetch articles");
    }

    const data = await resArticle.json();
    const article = data.data.post ?? [];
    const sortedList = data.data.post_sorted_list_item ?? [];
    const tableOfContents = data.data.table_of_contents_item ?? [];
    const triviaQuiz = data.data.trivia_quiz_item ?? [];
    const personalityQuiz = data.data.personality_quiz_item ?? [];
    const pollItem = data.data.poll_item ?? [];
    const comments = data.data.comments ?? [];
    const saved = data.data.saved;
    const totalComments = data.data.totalComments;
    const comment_system = data.data.comment_system;
    return {
      article,
      sortedList,
      tableOfContents,
      triviaQuiz,
      personalityQuiz,
      pollItem,
      comments,
      saved,
      totalComments,
      comment_system,
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
    return {
      article: [],
      sortedList: [],
      comments: [],
      tableOfContents: [],
      personalityQuiz: [],
      triviaQuiz: [],
      pollItem: [],
      saved: null,
      totalComments: 0,
      comment_system: 0,
    };
  }
};

const pagesService = async (id) => {
  try {
    const resArticle = await fetch(
      `${process.env.NEXT_API_URL}/api/posts/article/${id}`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!resArticle.ok) {
      throw new Error("Failed to fetch pages");
    }
    const data = await resArticle.json();
    return { data: data?.data };
  } catch (error) {
    return { data: {} };
  }
};
export { articleService, pagesService };
