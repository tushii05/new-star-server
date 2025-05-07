import PostLayout from "@/components/postLayout/post-layout";
import { getPostByTitle } from "@/services/search.service";
import getLanguageId from "@/utils/langId";

export default async function Search({ params, searchParams }) {
  const { locale } = params;
  const title = searchParams?.title;
  const lang_id = await getLanguageId(locale);
  const data = await getPostByTitle(lang_id, 1, 10, title, "", "");
  const currentSearchParams = new URLSearchParams();
  for (const key in searchParams) {
    currentSearchParams.append(key, searchParams[key]);
  }

  return (
    <PostLayout
      categoriesData={data}
      breadcrumb={{ parent: title }}
      params={{ ...params, slug: title }}
      type="search"
    />
  );
}
