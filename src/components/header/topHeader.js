import CustomLink from "../../utils/custom-link";

export default async function TopHeader({ locale, topMenu }) {
  return (
    <div className="container px-lg-0 menu-top py-1">
      {topMenu?.length
        ? topMenu.map((topmenu, index) => (
            <CustomLink key={index} href={`/${topmenu?.slug}`} lang={locale}>
              {topmenu?.title}
            </CustomLink>
          ))
        : null}
    </div>
  );
}
