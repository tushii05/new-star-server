import RelatedPost from "@/components/related-post/related-post";
import { getCategoriesPosts } from "@/services/category.service";
import { typeBasedData } from "@/services/typeBasedData.service";
import getLanguageId from "@/utils/langId";

export default async function page(props) {
  const params = props.params;
  const { slug, locale } = params;
  const lang_id = await getLanguageId(locale);

  const { data } = await typeBasedData(slug, lang_id, 1, 10, "");
  const categorySlug = data?.article?.category?.name_slug;
  const articleId = data?.article?.id;
  const categoriesData = await getCategoriesPosts(categorySlug, 1, 5);
  const removeCurrentArticle = categoriesData?.posts
    ? categoriesData.posts.filter((article) => article?.id !== articleId)
    : [];
  return (
    <RelatedPost
      data={removeCurrentArticle}
      categorySlug={categorySlug}
      langId={lang_id}
      locale={locale}
    />
  );
}
