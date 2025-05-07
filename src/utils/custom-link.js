"use client";
import { i18n } from "@/i18n.config";
import Link from "next/link";

export default function CustomLink({
  href = "/",
  lang,
  name,
  icon,
  children,
  disabledefaultbheaviour = false,
  closeSidebar = false,
  ...props
}) {
  const path = lang && lang !== i18n.defaultLocale ? `/${lang}/${href}` : href;
  // const path =
  //   lang && lang !== i18n.defaultLocale ? `/${lang}${href}` : `/${lang}${href}`;

  const handleClick = (e) => {
    const sideBar = document.getElementById("mySidenav");

    if (sideBar) {
      if (closeSidebar) {
        sideBar.style.width = "0px";
      }
      if (disabledefaultbheaviour) {
        // e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
      }
    }
  };

  return (
    <Link href={path} onClick={handleClick} {...props}>
      {children || name}
      {icon && <span>{icon}</span>}
    </Link>
  );
}
