"use client";
import React, { useEffect, useState } from "react";
import CustomLink from "../../utils/custom-link";
import MasonryLayout from "./masonry-layout/masonry-layout";
import { getGalleryAlbum } from "@/services/gallery.service";

export default function GalleryDetails({ params, searchParams }) {
  const { locale, slug, subSlug } = params;
  const id = searchParams?.albumId;
  const [categoryId, setCategoryId] = useState("");
  const [album, setAlbum] = useState([]);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { album, gallery } = await getGalleryAlbum(id, categoryId);
      setAlbum(album);
      setGallery(gallery);
    };
    fetch();
  }, [id, categoryId]);

  return (
    <section className="pb-4 pt-2">
      <div className="container px-lg-0 mb-5 pb-5 gallery-detail">
        <div className="row ">
          <div className="col-lg-12 position-relative col-md-12">
            <div className="row">
              <div className="col-12">
                <p className="mb-4 page-active">
                  <CustomLink href="/" lang={locale} name="HOME" /> |{" "}
                  <CustomLink href={`/${slug}`} lang={locale} name={slug} />
                  <CustomLink
                    hidden={!subSlug}
                    href={`/${slug}/${subSlug}`}
                    lang={locale}
                    name={" | " + subSlug?.replace(/[\d-]+/g, " ")}
                  ></CustomLink>
                </p>
                <h2 className="sec-heading text-dark page-heading">
                  {album?.name}
                </h2>
              </div>
            </div>
            <div className="row">
              <div className="col-12 ps-lg-2 ps-lg-2">
                <div className="row popular-tags">
                  <div className="col-lg-12">
                    <ul
                      className="nav nav-pills mb-3"
                      id="pills-tab"
                      role="tablist"
                    >
                      {album?.categories?.length
                        ? album.categories.map((albumCategory, index) => (
                            <li
                              className="nav-item"
                              role="presentation"
                              key={index}
                              onClick={() => {
                                setCategoryId(albumCategory?.id);
                              }}
                            >
                              <span
                                className="badge bg-secondary nav-link"
                                id={"pills-tab-" + albumCategory?.id}
                                data-bs-toggle="pill"
                                data-bs-target={"#pills-" + albumCategory?.id}
                                type="button"
                                role="tab"
                                aria-controls={"pills-" + albumCategory?.id}
                                aria-selected="false"
                              >
                                {albumCategory?.name}
                              </span>
                            </li>
                          ))
                        : null}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="tab-content" id="pills-tabContent">
              {album?.categories?.length
                ? album.categories.map((albumCategory, index) => (
                    <div
                      className={`tab-pane fade  ${
                        albumCategory?.id === categoryId ? `active show` : ""
                      }`}
                      id={"pills-" + albumCategory?.id}
                      role="tabpanel"
                      aria-labelledby={"pills-tab-" + albumCategory?.id}
                      key={index}
                    >
                      <div className="row mt-2">
                        <MasonryLayout gallery={gallery} />
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
