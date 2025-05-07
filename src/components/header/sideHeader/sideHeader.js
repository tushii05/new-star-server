import { Fragment } from "react";
import CustomLink from "@/utils/custom-link";
import { getServerSession } from "next-auth";
import { authConfig } from "@/app/api/auth/[...nextauth]/route";
import SideHeaderClient from "./sideHeaderClient";
import PreventDefault from "../preventDefault";
import CloseBtn from "../closeBtn";
import LocaleSwitcher from "../locale-switcher";
import ProfileMenu from "../profileMenu";
import HeaderButtons from "../Buttons";

const renderCategoryList = (categories, locale) => {
  return categories.map((category, index) => {
    const categoryKey =
      category.slug || category.name_slug || `category-${index}`;
    const hasChildren = category.children && category.children.length > 0;

    return (
      <li key={categoryKey + Math.random()} className="nav-item">
        <CustomLink
          href={`/${category.name_slug || category.slug}`}
          lang={locale}
          className="nav-link collapsed"
          {...(hasChildren
            ? {
                disabledefaultbheaviour: true,
                "data-bs-toggle": "collapse",
                "data-bs-target": `#collapseCategory${index}`,
                "aria-expanded": false,
                "aria-controls": `collapseCategory${index}`,
              }
            : {})}
        >
          {category.name || category.title}
          {hasChildren && <PreventDefault index={`collapseCategory${index}`} />}
        </CustomLink>
        {hasChildren && (
          <div id={`collapseCategory${index}`} className="collapse">
            <ul className="list-unstyled ps-3">
              {renderSubCategoryList(
                category.children,
                locale,
                category.slug || category.name_slug
              )}
            </ul>
          </div>
        )}
      </li>
    );
  });
};

const renderSubCategoryList = (subCategories, locale, parentSlug) => {
  return subCategories.map((subCategory, subIndex) => {
    const subCategoryKey =
      subCategory.slug || subCategory.name_slug || `subCategory-${subIndex}`;
    const hasChildren =
      subCategory.sub_children && subCategory.sub_children.length > 0;

    return (
      <Fragment key={subCategoryKey + subIndex + "all" + Math.random()}>
        {subIndex === 0 ? (
          <li className="nav-item">
            <CustomLink
              href={`/${parentSlug}`}
              lang={locale}
              className="nav-link collapsed"
            >
              All
            </CustomLink>
          </li>
        ) : null}
        <li>
          <CustomLink
            href={`/${parentSlug}/${subCategory.name_slug || subCategory.slug}`}
            lang={locale}
            className="nav-link collapsed"
            {...(hasChildren
              ? {
                  disabledefaultbheaviour: true,
                  "data-bs-toggle": "collapse",
                  "data-bs-target": `#collapseSubCategory${subIndex}`,
                  "aria-expanded": false,
                  "aria-controls": `collapseSubCategory${subIndex}`,
                }
              : {})}
          >
            {subCategory.name || subCategory.title}
            {hasChildren && (
              <PreventDefault index={`collapseSubCategory${subIndex}`} />
            )}
          </CustomLink>
          {hasChildren && (
            <div id={`collapseSubCategory${subIndex}`} className="collapse">
              <ul className="list-unstyled ps-3">
                {subCategory.sub_children.map((child, childIndex) => (
                  <Fragment
                    key={
                      (child.slug || child.name_slug) + "all" + Math.random()
                    }
                  >
                    {childIndex === 0 ? (
                      <li className="nav-item">
                        <CustomLink
                          href={`/${parentSlug}/${
                            subCategory.name_slug || subCategory.slug
                          }`}
                          lang={locale}
                          className="nav-link collapsed"
                        >
                          All
                        </CustomLink>
                      </li>
                    ) : null}
                    <li>
                      <CustomLink
                        href={`/${parentSlug}/${
                          subCategory.name_slug || subCategory.slug
                        }/${child.name_slug || child.slug}`}
                        lang={locale}
                        className="nav-link"
                      >
                        {child.name || child.title}
                      </CustomLink>
                    </li>
                  </Fragment>
                ))}
              </ul>
            </div>
          )}
        </li>
      </Fragment>
    );
  });
};

export default async function SideHeader({
  categories,
  menuLimit,
  locale,
  multilingual_system,
}) {
  const session = await getServerSession(authConfig);
  const user = session?.user;
  const categoryList = categories.slice(0, menuLimit) ?? [];
  const displayMoreList = categories.slice(menuLimit) ?? [];

  return (
    <SideHeaderClient>
      <CloseBtn />
      {user ? (
        <ul className="mb-1 ps-4 text-light list-unstyled profile-top-menu">
          <ProfileMenu user={user} locale={locale} />
        </ul>
      ) : (
        <div className="d-flex justify-content-center">
          <HeaderButtons locale={locale} user={user} size="sm" />
        </div>
      )}
      <div className="border-light border-bottom mt-3 mb-2" />
      <ul className="list-unstyled">
        {renderCategoryList(categoryList, locale)}
      </ul>
      {displayMoreList.length > 0 && (
        <ul className="list-unstyled">
          <li className="nav-item">
            <CustomLink
              href="#"
              className="nav-link collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#collapseDisplayMore"
              aria-expanded="false"
              aria-controls="collapseDisplayMore"
            >
              More
              <PreventDefault index="collapseDisplayMore" />
            </CustomLink>
            <div id="collapseDisplayMore" className="collapse">
              <ul className="list-unstyled ps-3">
                {renderCategoryList(displayMoreList, locale)}
              </ul>
            </div>
          </li>
        </ul>
      )}
      <ul className="list-unstyled">
        <li className="nav-item">
          <CustomLink href="/e-paper" lang={locale}>
            E-paper
          </CustomLink>
        </li>{" "}
        <li className="nav-item">
          <CustomLink href="/web-story" lang={locale}>
            Web Story
          </CustomLink>
        </li>
      </ul>
      <div className="border-light border-bottom mt-3 mb-2" />
      <div className="d-flex">
        {multilingual_system && <LocaleSwitcher locale={locale} />}
      </div>
    </SideHeaderClient>
  );
}
