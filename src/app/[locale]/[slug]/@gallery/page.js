import { authConfig } from "@/app/api/auth/[...nextauth]/route";
import Gallery from "@/components/gallery/gallery";
import { typeBasedData } from "@/services/typeBasedData.service";
import getLanguageId from "@/utils/langId";
import { getServerSession } from "next-auth";

export default async function page({ params }) {
  const { slug, locale } = params;
  const [lang_id, session] = await Promise.all([
    getLanguageId(locale),
    getServerSession(authConfig),
  ]);
  const { data } = await typeBasedData(slug, lang_id, 1, 10, session?.user?.id);

  return <Gallery params={params} data={data?.items} />;
}
