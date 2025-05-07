import PostLayout from "@/components/postLayout/post-layout";
import { getPostByTitle } from "@/services/search.service";
import getLanguageId from "@/utils/langId";

export default async function page({ params }) {
  const { locale } = params;
  const lang_id = await getLanguageId(locale);
  const video = await getPostByTitle(lang_id, 1, 10, "", "video", "");
  return (
      <PostLayout
        categoriesData={video}
        breadcrumb={{ parent: "video" }}
        params={{ ...params, slug: "" }}
        type="video"
      />
  );
}
