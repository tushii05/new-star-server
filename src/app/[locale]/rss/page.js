import { getMenu } from "@/services/category.service";
import getLanguageId from "@/utils/langId";
import CustomLink from "@/utils/custom-link";
import customLangLink from "@/utils/custom-lang-link";
import RssFeed from "@/components/rss/rssFeed";

export default async function page({ params }) {
  const { locale } = params;

  const lang_id = await getLanguageId(locale);
  const { categories } = await getMenu(lang_id);

  // Function to recursively flatten the categories with filtering
  function flattenCategories(categoriesData) {
    const result = [];

    function recursiveFlatten(categoryArray) {
      categoryArray.forEach((category) => {
        // Exclude objects where name is "Home" or page_default_name is "gallery"
        if (
          category.name === "Home" ||
          category.page_default_name === "gallery" ||
          category.page_default_name !== undefined
        ) {
          return;
        }

        // Extract the required fields
        result.push({
          id: category.id,
          title: category.name || category.title,
          slug: category.name_slug || category.slug,
        });

        // Recursively process children and sub_children
        if (category.children && category.children.length > 0) {
          recursiveFlatten(category.children);
        }
        if (category.sub_children && category.sub_children.length > 0) {
          recursiveFlatten(category.sub_children);
        }
      });
    }

    recursiveFlatten(categoriesData);
    return result;
  }

  const filteredFlattenedData = flattenCategories(categories);

  return (
      <section className="pb-4 pt-2 sec-news1">
        <div className="container px-lg-0 mb-5 pb-5">
          <div className="row mx-auto">
            <div className="col-lg-12 position-relative col-md-8 ps-lg-0">
              <div className="row">
                <div className="col-12">
                  <p className="mb-4 page-active">
                    <CustomLink href="/" lang={locale}>
                      HOME
                    </CustomLink>
                    &nbsp;|&nbsp;
                    <CustomLink href="/rss" lang={locale}>
                      RSS FEEDS
                    </CustomLink>
                  </p>
                  <h2 className="sec-heading text-dark page-heading">
                    RSS Feeds
                  </h2>
                </div>
              </div>
              <div className="row about-desc">
                <div className="col-12">
                  {filteredFlattenedData?.length
                    ? filteredFlattenedData.map((rss, index) => (
                        <div className="row py-1" key={index}>
                          <div className="col-lg-3">
                            <RssFeed
                              locale={locale}
                              slug={rss.slug}
                              type="category"
                            />
                            <span className="ps-1">{rss.title}</span>
                          </div>
                          <div className="col-lg-9">
                            <CustomLink
                              lang={locale}
                              href={"/rss/category/" + rss.slug}
                            >
                              {process.env.NEXT_PUBLIC_APP_URL +
                                customLangLink(
                                  "/rss/category/" + rss.slug,
                                  locale
                                )}
                            </CustomLink>
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
