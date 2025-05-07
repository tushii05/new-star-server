import { memo } from "react";
import SideWidgets from "../sections/sideWidgets";

function PageLayout({ children, locale, removeClass }) {
  return (
    <section className={`pb-4 pt-2 ${removeClass ? `` : `sec-news1`}`}>
      <div className="container px-lg-0 mb-5 pb-5">
        <div className="row">
          <div className="col-lg-8 col-md-7 position-relative  ps-lg-0">
            {children}
          </div>
          <div className="col-lg-4 col-md-5">
            <SideWidgets locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
export default memo(PageLayout);
