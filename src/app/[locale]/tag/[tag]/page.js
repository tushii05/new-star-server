import PostLayout from "@/components/postLayout/post-layout";
import getLanguageId from "@/utils/langId";
import { getPostByTitle } from "@/services/search.service";

export default async function Tag({ params }) {
  const { tag, locale } = params;
  const lang_id = await getLanguageId(locale);
  const filterByTag = await getPostByTitle(lang_id, 1, 10, "", "", tag);
  return (
    <PostLayout
      categoriesData={filterByTag}
      params={{ ...params, slug: "tag/" + tag }}
      breadcrumb={{ parent: decodeURI(tag) }}
      type="tag"
    />
  );
}
