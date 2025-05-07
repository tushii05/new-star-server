import { cloneElement } from "react";
import CategoryType1 from "./categoryType1";
import CategoryType2 from "./categoryType2";
import dynamic from "next/dynamic";
const Videos = dynamic(() => import("./videos"), { ssr: false });
const Custom = dynamic(() => import("../widgets/custom"), { ssr: false });
const PopularTags = dynamic(() => import("../widgets/popular-tags"), {
  ssr: false,
});
const PopularPost = dynamic(() => import("../widgets/popular-post"), {
  ssr: false,
});
const VotingPoll = dynamic(() => import("../widgets/voting-poll/voting-poll"), {
  ssr: false,
});
const FollowUs = dynamic(() => import("../widgets/follow-us"), { ssr: false });

export default function SideWidgetsHome({
  categorizedPosts,
  dynamicContent,
  videos,
  locale,
}) {
  const componentMap = {
    "follow-us": FollowUs,
    poll: VotingPoll,
    tags: PopularTags,
    "popular-posts": PopularPost,
    "recommended-posts": PopularPost,
    custom: Custom,
  };

  const getComponentByDataKey = (key) => {
    for (const k in componentMap) {
      if (key.toLowerCase().includes(k)) {
        return componentMap[k];
      }
    }
  };

  // Prepare dynamic components
  const dynamicComponents = [];

  let index = 0;

  // Function to get 'n' next dynamic components
  const goNextComponent = (n) => {
    const result = [];
    for (let i = 0; i < n && index < Object.keys(dynamicContent).length; i++) {
      const key = Object.keys(dynamicContent)[index];
      const ComponentToRender = getComponentByDataKey(key);
      result.push(
        <ComponentToRender
          key={key + index}
          data={{
            obj: dynamicContent[key]?.obj,
            title: dynamicContent[key]?.title,
            more: dynamicContent[key]?.more,
            type: dynamicContent[key]?.type,
          }}
          locale={locale}
        />
      );
      index++;
    }
    return result;
  };

  // Track if Videos component has been added
  let videosAdded = false;

  // Track the last CategoryType2 component
  let lastCategoryType2 = null;

  // Process categorized posts
  categorizedPosts?.length &&
    categorizedPosts.forEach((category, catIndex) => {
      if (category.posts.length > 0) {
        // Render CategoryType1 or CategoryType2 based on index
        if (catIndex % 3 === 0) {
          dynamicComponents.push(
            <CategoryType1 key={catIndex} category={category} locale={locale} />
          );

          // Add the Videos component based on a specific condition
          if (!videosAdded && catIndex % 5 === 0) {
            // Example condition: add Videos component every 5 categories
            dynamicComponents.push(
              <Videos key="videos" videos={videos} locale={locale} />
            );
            videosAdded = true; // Ensure Videos component is only added once
          }
        } else {
          const categoryType2Component = (
            <CategoryType2
              key={catIndex}
              category={category}
              dataShow={2}
              locale={locale}
              sideBarContent={{
                catIndex: catIndex,
                length: Object.keys(dynamicContent).length,
              }}
            >
              {goNextComponent(2)}
            </CategoryType2>
          );

          dynamicComponents.push(categoryType2Component);
          lastCategoryType2 = categoryType2Component; // Track last CategoryType2
        }
      }
    });

  // After all categorized posts are processed, check if there's any dynamic content left to render
  if (index < Object.keys(dynamicContent).length && lastCategoryType2) {
    // Append the remaining dynamic content to the last rendered CategoryType2
    const remainingContent = goNextComponent(
      Object.keys(dynamicContent).length - index
    );

    dynamicComponents[dynamicComponents.length - 1] = cloneElement(
      lastCategoryType2,
      {},
      [...lastCategoryType2.props.children, ...remainingContent]
    );
  }

  return <>{dynamicComponents}</>;
}
