import CustomLink from "@/utils/custom-link";

const childrenList = (item) => {
  if (item?.children?.length > 0) return item.children;
  else if (item?.sub_children?.length > 0) return item.sub_children;
  else return [];
};

function DropdownItem({ item, parentPath = "", lang, downArrowIcon }) {
  const itemPath = `${parentPath}/${item?.name_slug ?? item?.slug}`;
  const itemKey = item?.slug || item?.name_slug || `item-${Math.random()}`;
  const hasChildren =
    item?.children?.length > 0 || item?.sub_children?.length > 0;
  return (
    <li key={itemKey}>
      <CustomLink
        href={itemPath}
        lang={lang}
        name={item?.name ?? item?.title}
        className="dropdown-item"
        {...(hasChildren ? { icon: downArrowIcon("#1d1d1d") } : {})}
      />
      {hasChildren && (
        <ul className="submenu-multilevel dropdown-menu">
          {childrenList(item).map((child) => (
            <DropdownItem
              key={child.slug || child.name_slug || `child-${Math.random()}`}
              item={child}
              parentPath={itemPath}
              lang={lang}
              downArrowIcon={downArrowIcon}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function Dropdown({
  displayMoreList = [],
  locale,
  downArrowIcon,
  categoryName,
  className,
  color,
  isClickable,
  parentPath,
}) {
  const slug = displayMoreList?.slug || displayMoreList?.name_slug;
  const itemKey = `/${parentPath}/${slug}`;
  const itemLength = isClickable
    ? childrenList(displayMoreList)
    : displayMoreList;
  return (
    <li className={className}>
      {isClickable ? (
        <CustomLink href={itemKey} lang={locale} className="nav-link">
          {categoryName}
          {itemLength?.length ? downArrowIcon(color) : null}
        </CustomLink>
      ) : (
        <a className="nav-link">
          {categoryName}
          {downArrowIcon(color)}
        </a>
      )}

      <ul
        className={itemLength?.length ? "dropdown-menu d-menu" : ""}
        aria-labelledby="navbarDropdown"
      >
        {itemLength?.length
          ? itemLength.map((item, idx) => (
              <DropdownItem
                key={item.slug || item.name_slug || `root-item-${idx}`}
                item={item}
                lang={locale}
                downArrowIcon={downArrowIcon}
                {...(isClickable ? { parentPath: itemKey } : {})}
              />
            ))
          : null}
      </ul>
    </li>
  );
}
