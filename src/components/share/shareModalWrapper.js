"use client";
import dynamic from "next/dynamic";
import { createContext, useState } from "react";
const ShareModal = dynamic(() => import("./shareModal"));

export const ShareModalContext = createContext({
  article: [],
  params: { locale: "" },
  open: false,
  setOpen: () => {},
});
export default function ShareModalWrapper({ title, params }) {
  const [open, setOpen] = useState(false);

  return (
    <ShareModalContext.Provider value={{ title, params, open, setOpen }}>
      <button
        className="btn btn-light border-0 btn-share ps-0"
        onClick={() => setOpen(true)}
      >
        <svg
          className="me-1"
          width={15}
          height={19}
          viewBox="0 0 15 19"
          fill="#fff"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.0907 3.61697C9.0907 1.99246 10.4136 0.675537 12.0455 0.675537C13.6774 0.675537 15.0003 1.99246 15.0003 3.61697C15.0003 5.24148 13.6774 6.5584 12.0455 6.5584C11.2215 6.5584 10.4768 6.22246 9.94145 5.68198L5.85103 8.46695C5.8888 8.65491 5.90866 8.84904 5.90866 9.04733C5.90866 9.44001 5.831 9.81539 5.69033 10.1585L10.1755 13.1053C10.6845 12.6908 11.3359 12.4412 12.0455 12.4412C13.6774 12.4412 15.0003 13.7582 15.0003 15.3827C15.0003 17.0072 13.6774 18.3241 12.0455 18.3241C10.4136 18.3241 9.0907 17.0072 9.0907 15.3827C9.0907 14.9572 9.18176 14.5522 9.34545 14.1865L4.89657 11.2635C4.3776 11.7146 3.69782 11.9887 2.95382 11.9887C1.32194 11.9887 -0.000976562 10.6718 -0.000976562 9.04733C-0.000976562 7.4228 1.32194 6.10588 2.95382 6.10588C3.89222 6.10588 4.72755 6.54127 5.26841 7.21891L9.23268 4.51977C9.14047 4.2349 9.0907 3.93135 9.0907 3.61697Z"
            fill="#1E3A8A"
          />
        </svg>
        Share
      </button>
      <ShareModal />
    </ShareModalContext.Provider>
  );
}
