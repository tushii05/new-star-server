import Image from "next/image";

const checkPostType = (type, width, height) => {
  if (type === "video") {
    return (
      // <div className="play-video-icon">
      //   <Image
      //     src="/images/icon/video-icon.svg"
      //     width={20}
      //     height={30}
      //     alt="videoicon"
      //     quality={10}
      //   />
      // </div>
      <svg
        className="play-video-icon"
        width={width ?? 73}
        height={height ?? 73}
        viewBox="0 0 73 73"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M36.5 72.75C56.5201 72.75 72.75 56.5201 72.75 36.5C72.75 16.4797 56.5201 0.25 36.5 0.25C16.4797 0.25 0.25 16.4797 0.25 36.5C0.25 56.5201 16.4797 72.75 36.5 72.75ZM31.7639 50.441L48.8747 40.3389C51.7083 38.6656 51.7083 34.3344 48.8747 32.6611L31.7639 22.5589C29.0097 20.9328 25.625 23.0493 25.625 26.3977V46.6021C25.625 49.9506 29.0097 52.0672 31.7639 50.441Z"
          fill="white"
        />
      </svg>
    );
  } else if (type === "audio") {
    return (
      // <div className="play-music-icon">
      //   <Image
      //     src="/images/icon/audio-icon.svg"
      //     width={20}
      //     height={30}
      //     alt="videoicon"
      //     quality={10}
      //   />
      // </div>
      <svg
        className="play-music-icon"
        width={width ?? 72}
        height={height ?? 72}
        viewBox="0 0 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M36 72C55.8823 72 72 55.8823 72 36C72 16.1177 55.8823 0 36 0C16.1177 0 0 16.1177 0 36C0 55.8823 16.1177 72 36 72ZM49 38.7607V24.9743C49 23.331 47.7045 22 46.105 22H31.6297C30.0317 22 28.7347 23.331 28.7347 24.9743V39.8984C28.674 39.8607 28.6161 39.8245 28.5604 39.7897C27.7223 39.2653 27.3992 39.0631 26.0133 39.0966C22.8852 39.171 20.1306 41.598 20.0047 44.8088C19.8758 48.1401 22.438 50.8931 25.6283 50.9972C28.9605 51.1057 31.6297 48.1297 31.6297 44.7047V29.4359C31.6297 28.6149 32.2782 27.9487 33.0772 27.9487H44.6574C45.4565 27.9487 46.105 28.6149 46.105 29.4359V33.9494C45.7511 33.8258 45.4584 33.715 45.2026 33.6183C44.3818 33.3079 43.9419 33.1415 43.0854 33.154C40.7317 33.1911 38.5272 34.6797 37.7397 36.9581C36.311 41.091 39.2365 44.9517 43.0376 45.0499C46.3554 45.1347 49 42.1693 49 38.7607Z"
          fill="white"
        />
      </svg>
    );
  } else {
    return null;
  }
};
export default checkPostType;
