import getLanguageId from "@/utils/langId";
import { adSpaceService } from "@/services/adSpace.service";
import dynamic from "next/dynamic";
const AdSpaceClient = dynamic(() => import("./ad-space-client"));

const position =
  "header" ||
  "index_top" ||
  "index_bottom" ||
  "in_article_1" ||
  "in_article_2" ||
  "post_top" ||
  "post_bottom" ||
  "posts_top" ||
  "posts_bottom";
"sidebar_1" || "sidebar_2";

export default async function AdSpace({ locale, position }) {
  const langId = await getLanguageId(locale);
  const { ad_spaces } = await adSpaceService(langId);
  const ads = ad_spaces?.find((ad) => ad.ad_space === position);
  return ads ? <AdSpaceClient ad={ads} /> : null;
}
