import CustomLink from "@/utils/custom-link";

export default function RenderMoreLink({ type, locale }) {
  return (
    <CustomLink href={`/widget/${type}`} lang={locale} className="more-btn">
      More
      <svg
        width="6"
        height="12"
        viewBox="0 0 8 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 13.5L7 7.5L0.999999 1.5"
          stroke="#1E3A8A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </CustomLink>
  );
}
