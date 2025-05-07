import dynamic from "next/dynamic";
import { Fragment } from "react";
const RenderMoreLink = dynamic(() => import("./renderMoreLink"));
const MeduimCard = dynamic(() => import("@/components/cards/MeduimCard"));
const ExtraSmallCard = dynamic(() =>
  import("@/components/cards/ExtraSmallCard")
);

const ExtraSmallCardComponent = ({ post, index, postsLength, locale }) => {
  return (
    <div className={index !== postsLength - 1 ? "bdr" : ""}>
      <ExtraSmallCard post={post} locale={locale} className="mt-2" />
    </div>
  );
};
const MeduimCardComponent = ({ post, locale }) => {
  return (
    <MeduimCard post={post} locale={locale} className="col-lg-6 col-md-6 bdr" />
  );
};
export const PopularPostContent = ({ data, locale, cardType }) => {
  const { obj = [] } = data;

  return (
    <div className="row px-0">
      {obj?.length > 0 &&
        obj.map((post, index) => (
          <Fragment key={index}>
            {cardType ? (
              <MeduimCardComponent post={post} index={index} locale={locale} />
            ) : (
              <ExtraSmallCardComponent
                post={post}
                index={index}
                postsLength={obj.length}
                locale={locale}
              />
            )}
          </Fragment>
        ))}
    </div>
  );
};
export default function PopularPost({ data = [], locale, cardType }) {
  const { obj = [], title, more, type } = data;

  return (
    <div className="position-relative bdr pb-1">
      <div className="row mb-2 mx-lg-auto">
        <div className="col-12 ps-lg-0">
          <h2 className="sec-heading text-dark mb-2 text-uppercase">{title}</h2>
        </div>
      </div>
      <PopularPostContent data={data} locale={locale} cardType={cardType} />

      {more && <RenderMoreLink type={type} locale={locale} />}
    </div>
  );
}
