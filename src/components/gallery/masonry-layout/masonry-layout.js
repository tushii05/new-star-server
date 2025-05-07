import YetAnotherReactLightbox from "@/lib/yet-another-react-lightbox";
import { getMediaUrl } from "@/utils/getUrl";
import Image from "next/image";
import { useState } from "react";

export default function MasonryLayout({ gallery }) {
  const [index, setIndex] = useState(-1);
  const openLightbox = (idx) => setIndex(idx);

  return (
    <>
      <div className="masonry">
        {gallery.map((item, idx) => {
          const imgSrc = getMediaUrl(item.path_small);
          return (
            <div className="masonry-item" key={idx}>
              <Image
                key={idx}
                height={246.359}
                width={382.891}
                className="img-fluid masonry-img mb-3"
                src={imgSrc}
                alt={item.title || `Image ${idx + 1}`}
                onClick={() => openLightbox(idx)}
                sizes="(max-width : 992px) 282px, 382.891px"
                loading="lazy"
              />
            </div>
          );
        })}
      </div>
      {index >= 0 && (
        <YetAnotherReactLightbox
          index={index}
          setIndex={setIndex}
          gallery={gallery}
        />
      )}
    </>
  );
}
