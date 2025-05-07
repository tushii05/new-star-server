// import { EmblaCarousel, EmblaCarouselSlide } from "@/lib/embla-carousel";
"use client";
import { getMediaUrl } from "@/utils/getUrl";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useMemo } from "react";
const EmblaCarousel = dynamic(() =>
  import("@/lib/embla-carousel").then((mod) => mod.EmblaCarousel)
);
const EmblaCarouselSlide = dynamic(() =>
  import("@/lib/embla-carousel").then((mod) => mod.EmblaCarouselSlide)
);

export default function ArticleImages({ article }) {
  const addCoverImageToCollection = useMemo(
    () => [
      {
        image_big: article.image_slider,
        image_default: article.image_big,
      },
      ...(article?.post_images || []),
    ],
    [article.image_slider, article.post_images, article.image_big]
  );
  return article?.post_images?.length ? (
    <EmblaCarousel>
      {addCoverImageToCollection.map((images, index) => (
        <EmblaCarouselSlide slides="article">
          <Image
            width={797.328}
            height={504}
            src={getMediaUrl(images.image_default, article.isOld)}
            key={index}
            alt="article"
            className="img-fluid article-image"
            sizes="(max-width : 992px) 797.328px, 100%"
            priority
          />
        </EmblaCarouselSlide>
      ))}
    </EmblaCarousel>
  ) : (
    (article?.image_big || article?.image_url) && (
      <Image
        width={797.328}
        height={504}
        src={
          article?.image_big
            ? getMediaUrl(article.image_big, article.isOld)
            : article?.image_url
        }
        alt={article?.title ?? "article"}
        className="img-fluid article-image"
        sizes="(max-width : 992px) 797.328px, 100%"
        priority
        // unoptimized={/\.gif$/i.test(
        //   article?.image_big
        //     ? getMediaUrl(article.image_big, article.isOld)
        //     : article?.image_url
        // )}
      />
    )
  );
}
