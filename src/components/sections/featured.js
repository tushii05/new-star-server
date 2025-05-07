import MeduimCard from "../cards/MeduimCard";
import SmallCardLeft from "../cards/SmallCardLeft";
import FeaturedPostCard from "@/components/cards/featuredPostCard";
import { EmblaCarousel, EmblaCarouselSlide } from "@/lib/embla-carousel";

export default function Featured({ featuredPosts, locale }) {
  const renderCarousel = () =>
    featuredPosts?.map((post, index) => (
      <EmblaCarouselSlide key={post?.id ?? index} slides="featured" autoPlay>
        <FeaturedPostCard post={post} locale={locale} />
      </EmblaCarouselSlide>
    ));

  const renderMediumCards = () =>
    featuredPosts
      ?.slice(1, 4)
      .map((post, index) => (
        <MeduimCard key={post?.id ?? index} post={post} locale={locale} />
      ));

  const renderSmallCards = () =>
    featuredPosts
      ?.slice(4, 6)
      .map((post, index) => (
        <SmallCardLeft key={post?.id ?? index} post={post} locale={locale} />
      ));

  return (
    <>
      {/* Featured Posts Section */}
      <section className="py-2 sliderFirst">
        <div className="container px-lg-0">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="sec-heading text-dark mb-0">FEATURED POST</h2>
            </div>
          </div>
        </div>
        <div className="container px-lg-0 pb-4 bdr-bottom-1">
          <EmblaCarousel
            arrowIcons={false}
            dots={false}
            autoPlay
            slidesToScroll={1}
          >
            {featuredPosts?.length > 0 && renderCarousel()}
          </EmblaCarousel>
        </div>
      </section>

      {/* Medium Cards Section */}
      <section className="pb-4 pt-3 sec-news1">
        <div className="container px-lg-0">
          <div className="bdr">
            <div className="row">
              {featuredPosts?.length > 0 && renderMediumCards()}
            </div>
          </div>
        </div>
      </section>

      {/* Small Cards Section */}
      <section className="pb-5 pt-2 sec-news2">
        <div className="container px-lg-0">
          <div className="row">
            {featuredPosts?.length > 0 && renderSmallCards()}
          </div>
        </div>
      </section>
    </>
  );
}
