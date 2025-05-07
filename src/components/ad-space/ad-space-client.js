"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const HtmlContent = dynamic(() => import("@/utils/htmlContent"));
export default function AdSpaceClient({ ad }) {
  const [adSpaces, setAdSpaces] = useState(null);

  useEffect(() => {
    const isBrowser = typeof window !== "undefined";
    if (!isBrowser) return;

    const getAdData = () => {
      const isDesktop = window.innerWidth >= 992;
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = isDesktop ? ad?.ad_code_desktop : ad?.ad_code_mobile;

      const imgElement = tempDiv.querySelector("img");
      if (imgElement) {
        imgElement.style.width = isDesktop
          ? ad?.desktop_width
          : ad?.mobile_width;
        imgElement.style.height = isDesktop
          ? ad?.desktop_height
          : ad?.mobile_height;
      }

      return {
        ...ad,
        ad_code: isDesktop ? ad?.ad_code_desktop : ad?.ad_code_mobile,
      };
    };

    setAdSpaces(getAdData());

    const handleResize = () => {
      clearTimeout(window.resizeTimeout);
      window.resizeTimeout = setTimeout(() => setAdSpaces(getAdData()), 200);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [ad]);

  return adSpaces?.ad_code ? (
    <div className="container px-lg-0 ">
      <div className="ad-space">
        <span className="adtext text-uppercase">Advertisement</span>
        <HtmlContent data={adSpaces.ad_code} />
      </div>
    </div>
  ) : null;
}
