import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

export const usePrevNextButtons = (emblaApi, onButtonClick) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      onButtonClick?.(emblaApi);
    }
  }, [emblaApi, onButtonClick]);

  const onNextButtonClick = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      onButtonClick?.(emblaApi);
    }
  }, [emblaApi, onButtonClick]);

  const onSelect = useCallback(() => {
    if (emblaApi) {
      setPrevBtnDisabled(!emblaApi.canScrollPrev());
      setNextBtnDisabled(!emblaApi.canScrollNext());
    }
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      onSelect();
      emblaApi.on("reInit", onSelect).on("select", onSelect);
    }
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};
export const PrevButton = (props) => {
  const { children, ...restProps } = props;

  return (
    <button
      className="embla__button embla__button--prev"
      type="button"
      {...restProps}
    >
      <Image
        width={12}
        height={12}
        alt="arrow"
        src="/images/icon/arrow-prev.svg"
        className="embla__button__svg"
      />
      {children}
    </button>
  );
};

export const NextButton = (props) => {
  const { children, ...restProps } = props;

  return (
    <button
      className="embla__button embla__button--next"
      type="button"
      {...restProps}
    >
      <Image
        width={12}
        height={12}
        alt="arrow"
        src="/images/icon/arrow-next.svg"
        className="embla__button__svg"
      />

      {children}
    </button>
  );
};
