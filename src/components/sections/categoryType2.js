import dynamic from "next/dynamic";
import ExtraSmallCard from "@/components/cards/ExtraSmallCard";
import MeduimCard from "@/components/cards/MeduimCard";
import CustomLink from "@/utils/custom-link";
const AdSpace = dynamic(() => import("../ad-space/ad-space"));
export default function CategoryType2({
  category,
  dataShow,
  children,
  locale,
  sideBarContent,
}) {
  const slug = category?.posts?.[0]?.category?.name_slug;

  const renderMediumCards = () =>
    category?.posts
      ?.slice(0, dataShow)
      .map((post, idx) => (
        <MeduimCard
          key={post?.id ?? idx}
          post={post}
          categoryName={category?.categoryName}
          className="col-lg-6 col-md-6 bdr mb-2"
          locale={locale}
        />
      ));

  const renderExtraSmallCards = () =>
    category?.posts
      ?.slice(dataShow)
      .map((post, idx) => (
        <ExtraSmallCard
          key={post?.id ?? idx}
          post={post}
          categoryName={category?.categoryName}
          className="col-lg-6 col-md-6 bdr"
          locale={locale}
        />
      ));

  const renderMoreLink = () =>
    category?.posts?.length > 6 && (
      <CustomLink href={`/${slug}`} lang={locale} className="more-btn">
        More
        <svg
          width="6"
          height="12"
          viewBox="0 0 8 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 13.5L7 7.5L0.999999 1.5"
            stroke="#1E3A8A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </CustomLink>
    );

  const renderAdSpace = (position) =>
    sideBarContent?.catIndex === position && (
      <AdSpace locale={locale} position={`sidebar_${position}`} />
    );

  return (
    <section className="py-1 sec-news1">
      <div className="container px-lg-0">
        <div className="row">
          {/* Main Content */}
          <div className="col-lg-8 col-md-8 position-relative bdr">
            <div className="row">
              <div className="col-5">
                <h2 className="sec-heading text-dark text-uppercase">
                  {category?.categoryName}
                </h2>
              </div>
              {/* <div className="col-7 d-flex justify-content-end">
                <ul
                  className="nav nav-pills mb-3"
                  id="pills-tab"
                  role="tablist"
                >
                  {category?.childCategories?.length
                    ? category.childCategories.map((itemCategory, index) => (
                        <li
                          className="nav-item"
                          role="presentation"
                          key={index}
                        >
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

            <div>
              <div className="row news-cat-three mb-3">
                {category?.posts?.length > 0 && renderMediumCards()}
              </div>
              <div className="row pb-3" hidden={dataShow === 6}>
                {category?.posts?.length > dataShow && renderExtraSmallCards()}
              </div>
            </div>
            {renderMoreLink()}
          </div>

          {/* Sidebar */}
          <div className="col-lg-4 col-md-4 bdr pb-3 mt-0 s93-scroll">
            {renderAdSpace(1)}
            {children}
            {renderAdSpace(sideBarContent?.length - 1)}
          </div>
        </div>
      </div>
    </section>
  );
}
