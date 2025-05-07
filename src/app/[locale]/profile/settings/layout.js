import { authConfig } from "@/app/api/auth/[...nextauth]/route";
import ProfileTab from "@/components/profile/profileTab";
import { getUserService } from "@/services/user.service";
import CustomLink from "@/utils/custom-link";
import { formatDate } from "@/utils/formatDate";
import { getServerSession } from "next-auth";
import { permanentRedirect } from "next/navigation";

export default async function RootLayout({ children, params }) {
  const { locale } = params;
  const session = await getServerSession(authConfig);
  const user = session?.user?.id && (await getUserService(session?.user?.id));
  if (!session) {
    permanentRedirect("/");
  }
  const profileMenu = [
    { name: "Update Profile", slug: "/" },
    { name: "Social Accounts", slug: "social-account" },
    // { name: "Preferences", slug: "preferences" },
    { name: "Change Password", slug: "change-password" },
    { name: "Delete Account", slug: "delete-account" },
  ];
  return (
    <section className="pb-4 pt-2 sec-news1">
      <div className="container px-lg-0 mb-5 pb-5">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm col-6">
            <p className="page-active mb-2">
              <CustomLink href="/" lang={locale}>
                HOME
              </CustomLink>{" "}
              |{" "}
              <CustomLink href={"/profile/" + user?.slug} lang={locale}>
                MY PROFILE
              </CustomLink>
            </p>
          </div>
          <div className="col-lg-6 col-md-6 col-sm col-6">
            <p className="text-end mb-2">
              Member since {user?.createdAt && formatDate(user?.created_at)}
            </p>
          </div>
        </div>
        <div
          className="row popular-tags profile-tabs my-3"
          style={{ overflowX: "auto" }}
        >
          <ProfileTab locale={locale} data={profileMenu} />
        </div>
        {children}
      </div>
    </section>
  );
}
