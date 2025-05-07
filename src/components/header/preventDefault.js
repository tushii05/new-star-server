"use client";
import Image from "next/image";

export default function PreventDefault({ index }) {
  return (
    <Image
      width={50}
      height={50}
      alt="arrow"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
      }}
      className="fas ms-1"
      src="/images/icon/right-arrow-white.svg"
      data-bs-toggle="collapse"
      data-bs-target={`#${index}`}
      aria-expanded="false"
      aria-controls={`${index}`}
    />
  );
}
