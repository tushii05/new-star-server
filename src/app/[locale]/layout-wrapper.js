"use client";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const Bootstrap = dynamic(
  () => import("@/lib/bootstrap/bootstrap").then((module) => module.default),
  { ssr: false }
);

const NextTopLoader = dynamic(
  () => import("nextjs-toploader").then((module) => module.default),
  { ssr: false }
);

const Toaster = dynamic(
  () => import("sonner").then((module) => module.Toaster),
  { ssr: false }
);

export default function LayoutWrapper() {
  const pathName = usePathname();
  const isHide = /\/web-story\//.test(pathName);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const htmlRoot = document.getElementById("root");
      const htmlBody = document.body;

      if (htmlBody) {
        htmlBody.classList.remove(
          "amp-dark-mode",
          "amp-mode-mouse",
          "amp-mode-keyboard-active"
        );
        htmlBody.removeAttribute("style");
      }

      if (htmlRoot) {
        htmlRoot.classList.remove(
          "i-amphtml-singledoc",
          "i-amphtml-standalone"
        );
        htmlRoot.removeAttribute("style");
        htmlRoot.removeAttribute("amp-version");
      }
    }
  }, [!isHide]);

  return (
    <>
      <Bootstrap />
      <NextTopLoader color="#1e3a8a" showSpinner={false} />
      <Toaster position="top-center" richColors />
    </>
  );
}
