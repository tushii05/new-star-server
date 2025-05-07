import CustomLink from "@/utils/custom-link";
import dynamic from "next/dynamic";

// Dynamically import RenderMoreLink
const RenderMoreLink = dynamic(() => import("./renderMoreLink"));

export const PopularTagsContent = ({ data, locale }) => {
  const { obj = [] } = data;
  return (
    <div className="col-lg-12 popular-tags">
      {obj.map((tag) => (
        <span className="badge bg-secondary" key={tag?.tag}>
          <CustomLink href={`/tag/${tag?.tag}`} lang={locale} name={tag?.tag} />
        </span>
      ))}
    </div>
  );
};

export default function PopularTags({ data, locale }) {
  const { obj = [], title, more, type } = data;

  if (!obj.length) return null;

  return (
    <div className="mx-auto bdr my-3 position-relative">
      <div className="row">
        <div className="col-5">
          <h2 className="sec-heading text-dark text-uppercase">{title}</h2>
        </div>
      </div>
      <div className="row popular-tags">
        <div className="col-lg-12">
          <PopularTagsContent data={data} locale={locale} />
        </div>
      </div>
      {more && <RenderMoreLink type={type} locale={locale} />}
    </div>
  );
}
