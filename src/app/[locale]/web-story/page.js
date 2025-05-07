import WebStoryCard from "@/components/cards/webStoryCard";
import Layout from "@/components/layout/layout";
import PageLayout from "@/components/layout/pageLayout";
import { getAllWebStories } from "@/services/webstory.service";
import CustomLink from "@/utils/custom-link";
import LoadMoreWebStory from "./load-more-widget";

export default async function WebStory({ params }) {
  const { locale } = params;
  const { web_stories } = await getAllWebStories(1, 2);
  return (
      <>
        <div className="row">
          <div className="col-12">
            <p className="mb-4 page-active">
              <CustomLink href="/" lang={locale}>
                HOME
              </CustomLink>{" "}
              |{" "}
              <CustomLink href="/web-story" lang={locale}>
                WEB STORY
              </CustomLink>
            </p>
            <h2 className="sec-heading text-dark mb-3">Web Story</h2>
          </div>
        </div>
        {web_stories?.length
          ? web_stories.map((story, index) => (
              <WebStoryCard story={story} locale={locale} key={index} />
            ))
          : null}
        <LoadMoreWebStory params={params} />
      </>
  );
}
