"use client";
import { Children, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { NextButton, PrevButton, usePrevNextButtons } from "./arrow-buttons";
import { DotButton, useDotButton } from "./dots";

const classes = (slides) => {
  const component = {
    video: "embla__slide_video",
    featured: "embla__slide_featured",
    article: "embla__slide_article",
    header: "embla__slide_header",
  };
  return component[slides] ?? "embla__slide";
  // if (slides === "video") {
  //   return "embla__slide_video";
  // } else if (slides === "featured") {
  //   return "embla__slide_featured";
  // } else if (slides === "article") {
  //   return "embla__slide_article";
  // } else if (slides === "header") {
  //   return "embla__slide_header";
  // } else {
  //   return "embla__slide";
  // }
};
export function EmblaCarousel({
  children,
  className = "",
  autoPlay = false,
  dots = true,
  arrowIcons = true,
  slidesToScroll = "auto",
  dragFree = false,

  ...props
}) {
  // Embla options and plugins
  const options = { dragFree, slidesToScroll, loop: false };
  const plugins = autoPlay ? [Autoplay({ delay: 7000 })] : [];
  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);

  // Handle autoplay reset or stop
  const onNavButtonClick = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, [emblaApi]);

  // Dot button handling
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  );

  // Prev/Next button handling
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi, onNavButtonClick);

  return (
    <div className={`embla ${className}`} {...props}>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">{children}</div>
      </div>

      {/* Navigation Controls */}
      {arrowIcons ? (
        <div className="embla__controls">
          <div className="embla__buttons">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
        </div>
      ) : null}

      {/* Dot Navigation */}
      {dots ? (
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`embla__dot ${
                index === selectedIndex ? "embla__dot--selected" : ""
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function EmblaCarouselSlide({ children, className, slides }) {
  // Render each slide

  return Children.map(children, (child, index) => (
    <div className={classes(slides) + " " + className} key={index}>
      <div className="embla__slide__number">{child}</div>
    </div>
  ));
}
