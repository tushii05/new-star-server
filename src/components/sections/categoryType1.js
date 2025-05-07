import LargeCard from "../cards/LargeCard";
import MeduimCard from "../cards/MeduimCard";
import SmallCardLeft from "../cards/SmallCardLeft";
import CustomLink from "@/utils/custom-link";

export default function CategoryType1({ category, locale }) {
  const { categoryName, posts = [], childCategories } = category || {};

  const renderPosts = (PostComponent, postsSlice, sliceKey) =>
    postsSlice.map((post, index) => (
      <PostComponent
        post={post}
        categoryName={categoryName}
        key={`${sliceKey}-${index}`}
        locale={locale}
      />
    ));

  const slug = category?.posts?.[0]?.category?.name_slug;

  return (
    <div>
      <section className="py-1 sec-news1">
        <div className="container px-lg-0">
          <div className="row">
            <div className="col-5">
              <h2 className="sec-heading text-dark text-uppercase">
                {categoryName}
              </h2>
            </div>
            {/* <div className="col-7 d-flex justify-content-end">
              <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                {childCategories?.length
                  ? category.childCategories.map((itemCategory, index) => (
                      <li className="nav-item" role="presentation" key={index}>
                        <button
                          className="nav-link active"
                          id="pills-home-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-home"
                          type="button"
                          role="tab"
                          aria-controls="pills-home"
                          aria-selected="true"
                        >
                          {itemCategory?.name}
                        </button>
                      </li>
                    ))
                  : null}
              </ul>
            </div> */}
          </div>

          <div className="row bdr news-cat-two">
            {posts.length > 0 &&
              renderPosts(LargeCard, posts.slice(0, 2), "large")}
          </div>
          {posts.length > 2 && (
            <div className="row bdr pt-4">
              {renderPosts(MeduimCard, posts.slice(2, 5), "medium")}
            </div>
          )}
        </div>
      </section>

      {posts.length > 5 && (
        <section className="pb-2 pt-2 sec-news2">
          <div className="container px-lg-0 ">
            <div className="row bdr pb-3">
              {renderPosts(SmallCardLeft, posts.slice(5, 7), "small")}
            </div>
            {posts?.length > 7 ? (
              <CustomLink href={`/${slug}`} lang={locale} className="more-btn">
                More
                <svg
                  width={6}
                  height={12}
                  viewBox="0 0 8 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 13.5L7 7.5L0.999999 1.5"
                    stroke="#1E3A8A"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </CustomLink>
            ) : null}
          </div>
        </section>
      )}
    </div>
  );
}
