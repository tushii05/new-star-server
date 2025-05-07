import { authConfig } from "@/app/api/auth/[...nextauth]/route";
import { typeBasedData } from "@/services/typeBasedData.service";
import getMetaData from "@/utils/getMetaData";
import getLanguageId from "@/utils/langId";
import { getServerSession } from "next-auth";

export async function generateMetadata({ params }) {
  const { slug, locale } = params;
  const lang_id = await getLanguageId(locale);
  const { type, data } = await typeBasedData(slug, lang_id, "", "", "");
  if (type === "post") {
    return await getMetaData(params, data?.post);
  }
  return await getMetaData(params, data);
}

export default async function Sluglayout({
  children,
  post,
  category,
  page,
  gallery,
  params,
}) {
  const { slug, locale } = params;

  const [lang_id, session] = await Promise.all([
    getLanguageId(locale),
    getServerSession(authConfig),
  ]);
  const { type } = await typeBasedData(slug, lang_id, 1, 10, session?.user?.id);
  const componentToRender = { post, category, page, gallery };
  return componentToRender[type] ?? children;
}
