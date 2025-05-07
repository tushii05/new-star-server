import VideoCard from "../cards/VideoCard";
import CustomLink from "@/utils/custom-link";
import { EmblaCarousel, EmblaCarouselSlide } from "@/lib/embla-carousel";

export default function Videos({ videos, locale }) {
  if (!videos?.length) return null;

  const renderCarouselSlides = () =>
    videos.map((video, index) => (
      <EmblaCarouselSlide key={video?.id ?? index} slides="video" autoPlay>
        <VideoCard video={video} locale={locale} />
      </EmblaCarouselSlide>
    ));

  return (
    <section className="py-5 sec-news1 sec-slider">
      <div className="container px-lg-0">
        <div className="row">
          {/* Section Heading */}
          <div className="col-6">
            <h2 className="sec-heading">VIDEOS</h2>
          </div>
          {/* More Link */}
          <div className="col-6 text-end">
            <CustomLink lang={locale} className="more-btn-v1" href="/videos">
              More
              <svg
                className="ms-2"
                width={8}
                height={14}
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 13L7 7L0.999999 1"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </CustomLink>
          </div>
        </div>
        <EmblaCarousel autoPlay>{renderCarouselSlides()}</EmblaCarousel>
      </div>
    </section>
  );
}
