import CustomLink from "@/utils/custom-link";
import { getMediaUrl } from "@/utils/getUrl";
import Image from "next/image";

export default function Followers({ user, locale }) {
  const followers = user?.followers || [];
  const following = user?.following || [];
  return (
    <div className="accordion" id="accordionExample">
      <div className="accordion-item mb-4">
        <h2 className="accordion-header" id="headingOne">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="false"
            aria-controls="collapseOne"
          >
            Following ({following?.length})
          </button>
        </h2>
        <div
          id="collapseOne"
          className="accordion-collapse collapse"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <div className="followings d-inline-block">
              {following?.length
                ? following.map((item, index) => (
                    <CustomLink
                      href={"/profile/" + item?.following?.slug}
                      key={index + item?.following?.id}
                      lang={locale}
                    >
                      <Image
                        width={100}
                        height={100}
                        src={
                          item?.following?.avatar
                            ? getMediaUrl(item.following?.avatar)
                            : "/images/icon/user.svg"
                        }
                        alt={item?.following?.username ?? "avatar"}
                        className="img-fluid mb-2"
                      />
                    </CustomLink>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
      <div className="accordion-item mb-4">
        <h2 className="accordion-header" id="headingTwo">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            Followers ({followers?.length})
          </button>
        </h2>
        <div
          id="collapseTwo"
          className="accordion-collapse collapse"
          aria-labelledby="headingTwo"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <div className="followings d-inline-block">
              {followers?.length
                ? followers.map((item, index) => (
                    <CustomLink
                      href={"/profile/" + item?.follower?.slug}
                      key={index + item?.follower?.id}
                      lang={locale}
                    >
                      <Image
                        width={100}
                        height={100}
                        src={
                          item?.follower?.avatar
                            ? getMediaUrl(item?.follower?.avatar)
                            : "/images/icon/user.svg"
                        }
                        alt={item?.follower?.username ?? "avatar"}
                        className="img-fluid mb-2"
                      />
                    </CustomLink>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
