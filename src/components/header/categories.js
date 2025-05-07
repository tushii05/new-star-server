import CategoryList from "./categoryList";
import LocaleSwitcher from "./locale-switcher";

export default async function Categories({
  categories,
  menuLimit,
  locale,
  multilingual_system,
}) {
  const categoryList = categories.slice(0, menuLimit) ?? [];
  const displayMore = categories?.length > 5;
  const displayMoreList = categories.slice(menuLimit) ?? [];
  return (
    <div className="row mt-4 menu-two d-none d-lg-flex navbar">
      <div className="col-lg-10 col-md-10 d-flex ps-lg-0 ">
        <CategoryList
          categoryList={categoryList}
          displayMore={displayMore}
          displayMoreList={displayMoreList}
        />
      </div>
      <div className="col-lg-2 col-md-2 text-end">
        {multilingual_system && <LocaleSwitcher locale={locale} />}
      </div>
    </div>
  );
}
