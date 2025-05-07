import CustomLink from "@/utils/custom-link";
import { getMediaUrl } from "@/utils/getUrl";
import Image from "next/image";
import { Fragment } from "react";

export default async function GalleryCoverCard({ params, gallery }) {
  const { locale, slug } = params;
  return (
    <div className="row">
      {gallery?.length ? (
        gallery.map((galleryItem, index) =>
          galleryItem?.images?.length ? (
            <Fragment key={index}>
              <CustomLink
                href={`/${slug}/album?albumId=${galleryItem?.id}`}
                // prefetch={false}
                lang={locale}
                className="col-lg-5 col-md-5 col-sm col-12 position-relative mb-5 pb-5 gallery-col"
              >
                {galleryItem?.images?.map((image, idx) => (
                  <Image
                    key={idx}
                    width={382.891}
                    height={246.359}
                    src={getMediaUrl(image)}
                    alt={galleryItem?.name ?? "gallery_image"}
                    className={`img-fluid ${
                      idx + 1 === 2 ? "second" : idx + 1 === 3 ? "third" : ""
                    }`}
                    sizes="(max-width : 992px) 282px, 382.891px"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={process.env.NEXT_PUBLIC_BLUR_IMAGE}
                  />
                ))}
                <p className="gallery-tag text-capitalize">
                  {galleryItem?.name}
                </p>
              </CustomLink>
              <div className="col-lg-1 col-md-1 col-sm col-12" />
            </Fragment>
          ) : null
        )
      ) : (
        <p>No gallery items available</p>
      )}
    </div>
  );
}
