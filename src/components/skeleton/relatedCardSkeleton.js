import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function RelatedCardSkeleton() {
  return (
    <div className={"new-wrapper related bdr"}>
      <div className="col-lg-12 my-3">
        <div className="news-card card-icon-m1 article-image mb-0 ">
          <Skeleton height={504} />
          <div className="row cat-row d-flex align-item-center">
            <div className="col-6 col-md-6">
              <Skeleton width={70} height={25} />
            </div>
          </div>
          <div>
            <h4 className="news-card-heading h-auto">
              <Skeleton height={35} />
            </h4>
            <p className="news-card-desc mb-2">
              <Skeleton count={4} />
            </p>
            <div className="row news-date-time detail-div text-capitalize mt-3">
              <div className="col-lg-10 col-md-8 col-sm col-10">
                <Skeleton />
              </div>
              <div className="col-lg-2 col-md-4 col-sm col-2 cat-row text-end">
                <Skeleton width={30} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
