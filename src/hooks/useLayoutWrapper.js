import { usePathname } from "next/navigation";

export const useLayoutWrapper = () => {
  const pathName = usePathname();
  const isHide = /\/web-story\//.test(pathName);

  return { pathName };
};
