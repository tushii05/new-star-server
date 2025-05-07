import { useCallback, useEffect, useState } from "react";

export const useDotButton = (emblaApi, onButtonClick) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const onDotButtonClick = useCallback(
    (index) => {
      if (emblaApi) {
        emblaApi.scrollTo(index);
        onButtonClick?.(emblaApi);
      }
    },
    [emblaApi, onButtonClick]
  );

  useEffect(() => {
    if (emblaApi) {
      setScrollSnaps(emblaApi.scrollSnapList());
      setSelectedIndex(emblaApi.selectedScrollSnap());
      emblaApi
        .on("reInit", () => {
          setScrollSnaps(emblaApi.scrollSnapList());
          setSelectedIndex(emblaApi.selectedScrollSnap());
        })
        .on("select", () => {
          setSelectedIndex(emblaApi.selectedScrollSnap());
        });
    }
  }, [emblaApi]);

  return { selectedIndex, scrollSnaps, onDotButtonClick };
};
export const DotButton = (props) => {
  const { children, ...restProps } = props;

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  );
};
