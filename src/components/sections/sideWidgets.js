import { memo } from "react";
import { getWidgets } from "@/services/widgets.service";
import dynamic from "next/dynamic";
import getLanguageId from "@/utils/langId";

const AdSpace = dynamic(() => import("../ad-space/ad-space"), { ssr: false });
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

async function SideWidgets({ locale }) {
  const lang_id = await getLanguageId(locale);
  const dynamicContent = await getWidgets(lang_id);

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

  const dynamicData = Object.keys(dynamicContent).length
    ? Object.keys(dynamicContent).map((key, index) => {
        const ComponentToRender = getComponentByDataKey(key);
        return (
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
      })
    : null;

  return (
    <div className="sec-news1">
      <AdSpace locale={locale} position="sidebar_1" />
      {dynamicData}
      <AdSpace locale={locale} position="sidebar_2" />
    </div>
  );
}
export default memo(SideWidgets);
