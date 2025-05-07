import SmallCard from "../cards/SmallCard";
import { EmblaCarousel, EmblaCarouselSlide } from "@/lib/embla-carousel";

export default function Breaking({ breakingNews, locale }) {
  return (
    <section className="py-5 sec-news1 sec-slider">
      <div className="container px-lg-0">
        <h2 className="sec-heading">BREAKING NEWS</h2>

        <EmblaCarousel autoPlay>
          {breakingNews?.length
            ? breakingNews.map((breaking, index) => (
                <EmblaCarouselSlide key={index}>
                  <SmallCard
                    post={breaking}
                    key={index}
                    className="breaking-news-card"
                    locale={locale}
                  />
                </EmblaCarouselSlide>
              ))
            : null}
        </EmblaCarousel>
      </div>
    </section>
  );
}
