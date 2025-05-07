"use client";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { getMediaUrl } from "@/utils/getUrl";

export default function YetAnotherReactLightbox({ gallery, index, setIndex }) {
  const closeLightbox = () => setIndex(-1);
  return (
    index >= 0 && (
      <Lightbox
        open={index >= 0}
        close={closeLightbox}
        slides={gallery.map((item) => ({
          src: getMediaUrl(item.path_small),
          description: item?.title,
        }))}
        index={index}
        onIndexChange={setIndex}
        plugins={[Fullscreen, Zoom, Captions, Counter, Thumbnails]}
        zoom={{ maxZoomPixelRatio: 3 }}
      />
    )
  );
}
