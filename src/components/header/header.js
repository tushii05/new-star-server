import Image from "next/image";
import HeaderButtons from "./Buttons";
import Categories from "./categories";
import CustomLink from "../../utils/custom-link";
import SearchBar from "./searchBar";
import { getUserService } from "@/services/user.service";
import { getMediaUrl } from "@/utils/getUrl";
import { getServerSession } from "next-auth";
import { authConfig } from "@/app/api/auth/[...nextauth]/route";
import dynamic from "next/dynamic";
const AdSpace = dynamic(() => import("../ad-space/ad-space"), { ssr: false });

export default async function Header({
  locale,
  categories,
  menuLimit,
  generalSettings,
  settings,
}) {
  const session = await getServerSession(authConfig);
  const userId = session?.user?.id;
  const user = userId ? await getUserService(userId) : {};

  return (
    <>
      <div className="container px-lg-0 mt-3">
        <div className="row header-first d-flex align-items-center">
          <div className="col-lg-3 col-sm col-5">
            <CustomLink href="/" lang={locale}>
              <Image
                width={200}
                height={57.594}
                src={getMediaUrl(generalSettings?.logo)}
                alt={settings?.application_name ?? "appName"}
                className="img-fluid"
                priority
                sizes="(max-width : 992px) 200px, 100%"
                quality={30}
              />
            </CustomLink>
          </div>
          <SearchBar locale={locale} />
          <HeaderButtons locale={locale} user={user?.user} />
        </div>
        <Categories
          locale={locale}
          categories={categories}
          menuLimit={menuLimit}
          multilingual_system={generalSettings?.multilingual_system}
        />
      </div>
      <section className="second-menu-sec-row d-none d-lg-flex">
        <div className="container" />
      </section>
      <AdSpace locale={locale} position="header" />
    </>
  );
}
