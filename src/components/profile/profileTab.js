"use client";
import customLangLink from "@/utils/custom-lang-link";
import CustomLink from "@/utils/custom-link";
import { usePathname, useRouter } from "next/navigation";

export default function ProfileTab({ locale, data }) {
  const pathName = usePathname();
  const router = useRouter();
  const path = pathName.split("/").reverse()[0];

  return (
    <div className="col-lg-12 d-flex">
      {data.map((tab, tabIndex) => (
        <span
          className={`badge bg-secondary ${
            tab.slug === path || (path === "settings" && tab.slug === "/")
              ? "active"
              : ""
          }`}
          onClick={() =>
            router.push(customLangLink(`/profile/settings/${tab.slug}`, locale))
          }
          key={tabIndex}
        >
          <CustomLink href={`/profile/settings/${tab.slug}`} lang={locale}>
            {tab.name}
          </CustomLink>
        </span>
      ))}
    </div>
  );
}
