import Layout from "@/components/layout/layout";
import PageLayout from "@/components/layout/pageLayout";
import Custom from "@/components/widgets/custom";
import PopularPost from "@/components/widgets/popular-post";
import PopularTags from "@/components/widgets/popular-tags";
import VotingPoll from "@/components/widgets/voting-poll/voting-poll";
import { getWidgetsByType } from "@/services/widgets.service";
import CustomLink from "@/utils/custom-link";
import getLanguageId from "@/utils/langId";
import LoadMoreWidget from "./load-more-widget";

const componentMap = {
  custom: Custom,
  poll: VotingPoll,
  tags: PopularTags,
  "popular-posts": PopularPost,
  "recommended-posts": PopularPost,
};

export default async function Page({ params }) {
  const { widgetsType, locale } = params;

  // Fetch language ID and widget data
  const lang_id = await getLanguageId(locale);
  const widget = await getWidgetsByType(lang_id, widgetsType, 1, 10);

  // Dynamically select the component based on the widgetsType
  const WidgetComponent = componentMap[widgetsType.toLowerCase()];

  return (
    <>
      <div className="row">
        <div className="col-12">
          <p className="mb-2 page-active text-uppercase">
            <CustomLink href="/" lang={locale}>
              Home
            </CustomLink>
            &nbsp;|&nbsp;
            <CustomLink href={`/widget/${widgetsType}`} lang={locale}>
              {widgetsType}
            </CustomLink>
          </p>
        </div>
      </div>
      <div className={`row ${widgetsType === "custom" ? `article-image` : ``}`}>
        {WidgetComponent && (
          <WidgetComponent
            data={{
              obj: widget?.data,
              title: widgetsType,
              more: false,
              type: widgetsType,
            }}
            locale={locale}
            cardType
          />
        )}
        <LoadMoreWidget
          params={params}
          lang_id={lang_id}
          initialData={widget?.data}
        />
      </div>
    </>
  );
}
