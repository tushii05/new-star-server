"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";

export default function SessionProviderRoot({ children, session }) {
  const pathName = usePathname();
  const isWebStory = pathName.includes("/web-story/");
  const isGallery =
    pathName.includes("/gallery/") ||
    pathName.includes("/gallery") ||
    pathName.includes("/e-paper/");
  const isHome = pathName === "/";

  const closeSidebar = () => {
    const sideBar = document.getElementById("mySidenav");
    if (sideBar) {
      sideBar.style.width = "0px";
    }
  };

  const childrenArray = React.Children.toArray(children);

  const filteredChildren = {
    homeChild: [],
    webStoryChild: null,
    galleryChild: [],
    otherChild: [],
  };

  for (const child of childrenArray) {
    if (!React.isValidElement(child)) continue;

    const key = child?.props?.parallelRouterKey;
    const typeName = child?.type?.name || child?.type;

    if (
      isHome &&
      (key === "header" || key === "children" || key === "footer")
    ) {
      filteredChildren.homeChild.push(child);
    } else if (
      isWebStory &&
      key === "children" &&
      !filteredChildren.webStoryChild
    ) {
      filteredChildren.webStoryChild = child;
    } else if (isGallery && typeName !== "section") {
      filteredChildren.galleryChild.push(child);
    } else if (key !== "children") {
      filteredChildren.otherChild.push(child);
    }
  }

  let contentToRender;
  if (isWebStory) {
    contentToRender = filteredChildren.webStoryChild;
  } else if (isGallery) {
    contentToRender = filteredChildren.galleryChild;
  } else if (isHome) {
    contentToRender = filteredChildren.homeChild;
  } else {
    contentToRender = filteredChildren.otherChild;
  }
  return (
    <div onClick={closeSidebar}>
      <SessionProvider session={session}>{contentToRender}</SessionProvider>
    </div>
  );
}
