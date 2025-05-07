"use client";
import { useParams, usePathname } from "next/navigation";
import { memo, useCallback } from "react";
import CustomLink from "../../utils/custom-link";
import dynamic from "next/dynamic";
const EmblaCarousel = dynamic(
  () => import("@/lib/embla-carousel").then((module) => module.EmblaCarousel),
  { ssr: false }
);
const Dropdown = dynamic(() => import("./category/dropdown"));

const CategoryList = memo(({ categoryList, displayMore, displayMoreList }) => {
  const { slug, locale } = useParams();
  const pathName = usePathname();
  const isActiveCategory = useCallback(
    (category) => {
      if (!category) return false;
      const categorySlug = category?.name_slug || category?.slug;
      const isSlugMatch =
        decodeURI(slug) === categorySlug ||
        pathName === `/${categorySlug}` ||
        pathName === categorySlug ||
        pathName === categorySlug + locale;
      const isSubCategoryMatch = category?.children?.some((subCategory) => {
        const subCategorySlug = subCategory?.name_slug || subCategory?.slug;
        return (
          decodeURI(slug) === subCategorySlug ||
          pathName === `/${subCategorySlug}`
        );
      });

      return isSlugMatch || isSubCategoryMatch;
    },
    [slug, pathName]
  );

  const downArrowIcon = (color) => {
    return (
      <svg
        className="ms-2"
        width="13"
        height="8"
        viewBox="0 0 14 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1.82L7 7.82L13 1.82"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };
  return (
    <ul className="d-flex list-unstyled">
      {categoryList.map((category, index) => {
        const isActive = isActiveCategory(category);
        const categoryKey =
          category?.slug || category?.name_slug || `category-${index}`;

        return (
          <li className="nav-item" key={categoryKey}>
            <CustomLink
              href={`/${category?.name_slug ?? category?.slug}`}
              lang={locale}
              name={category?.name ?? category?.title}
              className={`nav-link ${isActive ? "active" : ""}`}
              {...(category?.children?.length
                ? isActive
                  ? { icon: downArrowIcon("#ffffff") }
                  : { icon: downArrowIcon("#1d1d1d") }
                : {})}
            />

            {isActive && category?.children?.length > 0 && (
              <div className="list-absolute sub-menu">
                <ul
                  className={`list-unstyled ${
                    category?.children?.length <= 13 && `slick-btn`
                  }`}
                >
                  <EmblaCarousel dots={false} slidesToScroll={1}>
                    <li key={`${categoryKey}-all`} className="ms-1">
                      <CustomLink
                        href={`/${category?.name_slug ?? category?.slug}`}
                        lang={locale}
                        name="All"
                        className="nav-link "
                      />
                    </li>
                    {category.children.map((subCategory, subIndex) => (
                      <Dropdown
                        key={
                          subCategory.slug ||
                          subCategory.name_slug ||
                          `sub-${subIndex}`
                        }
                        displayMoreList={subCategory}
                        locale={locale}
                        downArrowIcon={downArrowIcon}
                        categoryName={subCategory.name ?? subCategory.title}
                        className="nav-item dropdown drop-more ms-4 nav-list"
                        color="#ffffff"
                        isClickable
                        parentPath={category?.name_slug ?? category?.slug}
                      />
                    ))}
                  </EmblaCarousel>
                </ul>
              </div>
            )}
          </li>
        );
      })}
      {displayMore && (
        <Dropdown
          displayMoreList={displayMoreList}
          locale={locale}
          downArrowIcon={downArrowIcon}
          className="nav-item dropdown drop-more"
          categoryName="More"
          color="#1d1d1d"
          isClickable={false}
        />
      )}
      <li className="nav-item">
        <CustomLink href="/e-paper" lang={locale} className="nav-link">
          E-paper
        </CustomLink>
      </li>{" "}
      <li className="nav-item">
        <CustomLink href="/web-story" lang={locale} className="nav-link">
          Web Story
        </CustomLink>
      </li>
    </ul>
  );
});

export default CategoryList;
