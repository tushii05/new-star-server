import AMPStory from "@/lib/amp-story";
import { getWebStories } from "@/services/webstory.service";
import getMetaData from "@/utils/getMetaData";

export const amp = true;
export async function generateMetadata({ params }) {
  const { webStories } = params;
  const web_stories = await getWebStories(webStories);
  const web_storie = web_stories[0];
  return await getMetaData(params, {
    ...web_storie,
    title: web_storie?.meta_title || web_storie?.title,
    description: web_storie?.meta_description || web_storie?.content,
    summary: web_storie?.meta_description || web_storie?.content,
    keywords: web_storie?.meta_title || web_storie?.title,
    image_mid: web_storie?.cover_image,
  });
}
export default async function WebStories({ params }) {
  const { webStories } = params;
  const web_stories = await getWebStories(webStories);

  return <AMPStory web_stories={web_stories} />;
}
