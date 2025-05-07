"use client";
import CustomLink from "@/utils/custom-link";
import { getMediaUrl } from "@/utils/getUrl";
import Image from "next/image";

export default function ProfileMenu({ user, locale, size }) {
  return (
    <li className="dropdown drop-more">
      <div
        className={`${size == `sm` ? `nav-link` : ``}`}
        id="navbarDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <Image
          width={100}
          height={100}
          src={
            user?.avatar ? getMediaUrl(user.avatar) : "/images/icon/user.svg"
          }
          alt={user?.username ?? "avatar"}
          quality={30}
        />
        &nbsp;
        {user?.username}
      </div>
      <ul className="dropdown-menu d-menu" aria-labelledby="navbarDropdown">
        <li>
          <CustomLink
            className="dropdown-item"
            href={"/profile/" + user?.slug}
            lang={locale}
          >
            Profile
          </CustomLink>
        </li>
        <li>
          <CustomLink
            className="dropdown-item"
            href="/saved-post"
            lang={locale}
          >
            Saved Post
          </CustomLink>
        </li>
        <li>
          <CustomLink
            className="dropdown-item"
            href="/profile/settings"
            lang={locale}
          >
            Settings
          </CustomLink>
        </li>
        <li>
          <a
            className="dropdown-item"
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              e.preventDefault();
              e.nativeEvent.stopImmediatePropagation();
              import("next-auth/react").then((module) =>
                module.signOut({ callbackUrl: "/" })
              );
            }}
          >
            LogOut
          </a>
        </li>
      </ul>
    </li>
  );
}
