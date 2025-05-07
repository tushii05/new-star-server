import React from "react";
import CustomLink from "../../utils/custom-link";
import GalleryCoverCard from "./cards/gallery-cover-card";

export default async function Gallery({ params, data: gallery }) {
  const { locale, slug } = params;
  return (
    <section className="pb-4 pt-2 sec-news1">
      <div className="container px-lg-0 mb-5 pb-5">
        <div className="row">
          <div className="col-lg-12 position-relative col-md-8 ps-lg-0">
            <div className="row">
              <div className="col-12">
                <p className="mb-4 page-active text-uppercase">
                  <CustomLink href="/" lang={locale}>
                    Home
                  </CustomLink>
                  &nbsp;|&nbsp;
                  <CustomLink href={`/${slug}`} lang={locale}>
                    {slug}
                  </CustomLink>
                </p>
                <h2 className="sec-heading text-dark text-uppercase">
                  {slug}
                </h2>
              </div>
            </div>
            <div className="row gallery-row">
              <div className="col-10">
                <div className="row">
                  <GalleryCoverCard params={params} gallery={gallery} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
