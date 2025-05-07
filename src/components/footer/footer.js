import CustomLink from "../../utils/custom-link";
import Image from "next/image";
import footerService from "@/services/footer.service";
import socialIcons from "../widgets/social-link-data";
import { getMediaUrl } from "@/utils/getUrl";
import getLanguageId from "@/utils/langId";
import dynamic from "next/dynamic";
const Newsletter = dynamic(() => import("./newsletter"));
const ExtraSmallCard = dynamic(() =>
  import("@/components/cards/ExtraSmallCard")
);
export default async function Footer({ locale }) {
  const lang_id = await getLanguageId(locale);
  const { footerData, generalSetting, widgets } = await footerService(lang_id);
  let siteSettings = generalSetting?.generalSettings?.[0];
  let generalSettings = generalSetting?.settings?.[0];
  const followUs = widgets?.["follow-us"]?.obj;
  const popularPosts = widgets?.["popular-posts"]?.obj?.slice(0, 2);
  const rss = (
    <CustomLink lang={locale} href="/rss" className="icon-network ms-2">
      <svg
        width={22}
        height={20}
        viewBox="0 0 22 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.0469 12.0166C10.4193 12.2316 10.7196 12.5522 10.9097 12.9378C11.0999 13.3235 11.1715 13.7568 11.1153 14.1832C11.0592 14.6095 10.8779 15.0095 10.5944 15.3328C10.3109 15.6561 9.93792 15.888 9.5226 15.9993C9.10727 16.1106 8.66826 16.0962 8.2611 15.958C7.85394 15.8198 7.4969 15.564 7.23515 15.2228C6.97339 14.8817 6.81867 14.4706 6.79055 14.0416C6.76243 13.6125 6.86217 13.1847 7.07716 12.8124C7.36573 12.3133 7.84057 11.9492 8.3974 11.8C8.95422 11.6508 9.5475 11.7287 10.0469 12.0166Z"
          fill="#929292"
        />
        <path
          d="M15.2424 12.219C15.3162 12.4977 15.2764 12.7943 15.1316 13.0435C14.9867 13.2928 14.7488 13.4743 14.4702 13.5481C14.1915 13.622 13.895 13.5821 13.6457 13.4373C13.3965 13.2924 13.215 13.0545 13.1411 12.7759C12.8298 11.6765 12.1021 10.7419 11.1126 10.1706C10.1232 9.59934 8.94989 9.43645 7.84219 9.71655C7.70399 9.75453 7.5596 9.76458 7.41747 9.7461C7.27534 9.72762 7.13833 9.68098 7.01443 9.60892C6.82852 9.50154 6.67858 9.3415 6.58352 9.149C6.48845 8.9565 6.45251 8.74016 6.48024 8.52727C6.50797 8.31437 6.59813 8.11445 6.73933 7.95273C6.88054 7.79101 7.06647 7.67472 7.27369 7.61854C10.6523 6.70068 14.3479 8.83435 15.2424 12.219Z"
          fill="#929292"
        />
        <path
          d="M6.15257 3.4458C7.52646 3.06167 8.96323 2.95578 10.3786 3.13432C11.7939 3.31287 13.1594 3.77226 14.3949 4.48555C15.6303 5.19884 16.7109 6.15166 17.5732 7.28813C18.4355 8.42459 19.0622 9.72181 19.4165 11.1037C19.4895 11.3826 19.4488 11.679 19.3033 11.9279C19.1578 12.1767 18.9194 12.3576 18.6406 12.4306C18.3617 12.5037 18.0652 12.463 17.8164 12.3175C17.5676 12.172 17.3867 11.9336 17.3136 11.6547C16.1313 7.13797 11.2295 4.30792 6.72679 5.5424C6.44876 5.61855 6.15187 5.58113 5.90143 5.43838C5.65099 5.29562 5.46752 5.05923 5.39138 4.78121C5.31523 4.50318 5.35265 4.20629 5.4954 3.95585C5.63816 3.70541 5.87455 3.52194 6.15257 3.4458Z"
          fill="#929292"
        />
      </svg>
    </CustomLink>
  );
  return (
    <footer>
      <section className="footer-section footer1">
        <div className="container px-lg-0">
          <div className="row logo-footer">
            <div className="col-lg-2 col-md-2 col-sm col-4">
              <Image
                width={158.328}
                height={45.594}
                src={getMediaUrl(siteSettings?.logo_footer)}
                alt={generalSettings?.application_name ?? "logo"}
                className="img-fluid mt-1 footer-logo"
                loading="lazy"
              />
            </div>
            <div className="col-lg-10 col-md-10 col-sm col-8">
              <div className="row d-flex align-items-center footer-1-one">
                <div className="col-lg-5">
                  <ul className="list-unstyled d-flex links">
                    <li>
                      <CustomLink
                        href="/contact"
                        lang={locale}
                        name="Contact Us"
                      />
                    </li>
                    <li className="ms-4">
                      <CustomLink href="/about" lang={locale} name="About Us" />
                    </li>
                  </ul>
                </div>
                <div className="col-lg-7  pe-lg-2 pe-md-2 d-none d-lg-flex d-md-flex align-items-center justify-content-end">
                  <p className="mb-0">
                    Follow <b>{generalSettings?.application_name}</b> on
                  </p>
                  <ul className="list-unstyled d-flex ms-4 social">
                    {followUs && Object.entries(followUs)?.length
                      ? Object.entries(followUs)
                          .filter(([_, value]) => value !== null)
                          .map(([key, value], index) => (
                            <li key={key + index}>
                              <a href={value} className="ms-2">
                                {
                                  socialIcons.find((icon) => key === icon.key)
                                    .icon
                                }
                              </a>
                            </li>
                          ))
                      : null}
                    {rss}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-3 footer-section footer2"
        style={{ boxShadow: "0px 0px 10px 3px #00000042" }}
      >
        <div className="container px-lg-0">
          <div className="blue-line">
            <div className="row ">
              <div className="col-12 pe-lg-2 pe-md-2 d-block d-lg-none d-md-none">
                <p className="mb-2 align-items-start justify-content-start">
                  Follow <b>{generalSettings?.application_name}</b> on
                </p>
                <ul
                  className="list-unstyled d-flex pb-2 social"
                  style={{ overflow: "auto" }}
                >
                  {followUs && Object.entries(followUs)?.length
                    ? Object.entries(followUs)
                        .filter(([_, value]) => value !== null)
                        .map(([key, value], index) => (
                          <li key={key + index}>
                            <a href={value} className="ms-2">
                              {
                                socialIcons.find((icon) => key === icon.key)
                                  .icon
                              }
                            </a>
                          </li>
                        ))
                    : null}
                  {rss}
                </ul>
              </div>

              <div className="col-lg-8">
                <p className="pragraph-footer">
                  {generalSettings?.about_footer}
                </p>
                <div className="row pb-3 news-cat-four sec-news2 news-6b">
                  <h2 className="sec-heading text-dark mt-3">
                    Most Viewed Post
                  </h2>
                  {popularPosts?.length
                    ? popularPosts?.map((post, index) => (
                        <ExtraSmallCard
                          post={post}
                          key={index}
                          locale={locale}
                          className="col-lg-6"
                          classNameChild="border-0"
                        />
                      ))
                    : null}
                </div>
              </div>
              <div className="col-lg-1" />
              <div className="col-lg-3">
                <div className="card">
                  <div className="card-body py-3 px-3">
                    <h2 className="sec-heading text-dark mb-2">NEWS LETTER</h2>
                    <p>
                      Join our subscribers list to get the latest news, updates
                      and special offers directly in your inbox
                    </p>
                    <div className="form-bs pb-1">
                      <Newsletter />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3 copyright">
            <div className="col-lg-8 col-md-8 text-start">
              <p className="mb-0 fw-bold">{generalSettings?.copyright}</p>
            </div>
            <div className="col-lg-4 col-md-4 text-lg-end">
              {footerData?.length
                ? footerData.map((footer, index) => (
                    <CustomLink
                      href={`/${footer?.slug}`}
                      lang={locale}
                      name={footer?.title}
                      key={index}
                      className="text-dark fw-bold ms-4"
                    />
                  ))
                : null}
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
