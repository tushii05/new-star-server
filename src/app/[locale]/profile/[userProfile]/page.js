import Image from "next/image";
import { authConfig } from "@/app/api/auth/[...nextauth]/route";
import MeduimCard from "@/components/cards/MeduimCard";
import FollowUnfollow from "@/components/profile/follow-unfollow";
import Followers from "@/components/profile/followers";
import RssFeed from "@/components/rss/rssFeed";
import { getUserService, getUserPosts } from "@/services/user.service";
import CustomLink from "@/utils/custom-link";
import { formatDate } from "@/utils/formatDate";
import { getMediaUrl } from "@/utils/getUrl";
import timeAgo from "@/utils/time-conversion";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
const LoadMoreUsersPost = dynamic(() => import("./load-more-users-post"), {
  ssr: false,
});

export default async function Profile({ params }) {
  const { userProfile, locale } = params;
  const session = await getServerSession(authConfig);
  const sessionUser = session?.user;

  const [userData, userPost] =
    userProfile &&
    (await Promise.all([
      getUserService(userProfile),
      getUserPosts(userProfile, 1, 10),
    ]));

  const user = userData?.user;
  const userPostManipulate = userPost?.data?.posts?.map((item) => {
    return { ...item, user: { username: user?.username, slug: userProfile } };
  });
  return (
    <section className="pb-4 pt-2 sec-news1">
      <div className="container px-lg-0 mb-5 pb-5">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm col-6">
            <p className="page-active mb-2">
              <CustomLink href="/" lang={locale}>
                HOME
              </CustomLink>
              &nbsp;|&nbsp;
              <CustomLink href={"/profile/" + user?.slug} lang={locale}>
                MY PROFILE
              </CustomLink>
            </p>
          </div>
          <div className="col-lg-6 col-md-6 col-sm col-6">
            <p className="text-end mb-2">
              Member since&nbsp;
              {user?.createdAt && formatDate(user?.created_at)}
            </p>
          </div>
        </div>
        <div className="row profile-cover mb-3  position-relative">
          <div className="col-lg-12 position-relative">
            {user?.cover_image ? (
              <Image
                width={1190}
                height={210}
                src={getMediaUrl(user.cover_image)}
                alt={user?.username ?? "avatar"}
                className="cover-img"
                sizes="(max-width : 992px) 1190px, 100%"
                loading="eager"
              />
            ) : (
              <div className="cover-img bg-secondary" />
            )}
          </div>
          <div className="position-relative">
            <Image
              width={112}
              height={112}
              src={
                user?.avatar
                  ? getMediaUrl(user.avatar)
                  : "/images/icon/user.svg"
              }
              alt={user?.username ?? "avatar"}
              className="img-fluid profile"
              priority
            />
          </div>
        </div>
        <div className="row mx-auto">
          <div className="col-12">
            <div className="profile-dv">
              <div className="row pb-4">
                <div className="col-lg-7 col-md-7 col-sm col-6 mt-5 pt-4">
                  <h3 className="mb-0 mt-2">{user?.username}</h3>
                  <p className="mb-1 user-email">{user?.email}</p>
                </div>
                <div className="col-lg-5 col-md-5  col-sm col-6 text-end mt-2">
                  <div className="w-100 d-flex justify-content-end mb-4">
                    <RssFeed locale={locale} slug={user?.slug} type="author" />
                  </div>
                  {sessionUser &&
                    (sessionUser?.id === user?.id ? (
                      <CustomLink
                        lang={locale}
                        href="/profile/settings"
                        className="btn btn-primary"
                      >
                        Edit Profile
                      </CustomLink>
                    ) : (
                      <FollowUnfollow
                        userId={sessionUser?.id}
                        followerId={user?.id}
                        followerData={userData}
                      />
                    ))}
                  <p className="mb-1  last-seen mt-2">
                    Last Seen : {timeAgo(user?.last_seen)}
                  </p>
                </div>
              </div>
              <hr className="ms-2" />
              <div className="row mt-4">
                <div className="col-lg-12">
                  <Followers user={userData} locale={locale} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 pt-2">
            <div className="row news-cat-three">
              {userPostManipulate?.length
                ? userPostManipulate?.map((post, index) => (
                    <MeduimCard
                      post={post}
                      categoryName={post?.category?.name}
                      key={index}
                      className="col-lg-6 col-md-6 bdr-bottom-1 "
                      locale={locale}
                    />
                  ))
                : null}
              <LoadMoreUsersPost params={params} user={user} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
