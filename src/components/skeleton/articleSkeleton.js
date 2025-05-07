import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ArticleSkeleton() {
  return (
    <div className="detail-div blue-line pb-4">
      <div className="row">
        <div className="col-12">
          <Skeleton />
        </div>
      </div>
      <div className="row my-3">
        <div className="col-7">
          <Skeleton width={70} height={25} />
        </div>
        <div className="col-5 text-end">
          <Skeleton width={40} height={25} />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h1 className="news-card-heading">
            <Skeleton height={40} />
          </h1>
        </div>
      </div>
      <Skeleton count={4} />
      <div className="row news-date-time">
        <div className="col-lg-8 col-md-8 col-sm col-10 mt-2">
          <Skeleton />
        </div>
        <div className="col-lg-4 col-md-4 col-sm col-2 cat-row mt-2 d-flex justify-content-lg-end">
          <Skeleton width={25} />
        </div>
      </div>
      <div className="featured-img mt-3 article-image featured-slider position-relative">
        <Skeleton height={504} />
      </div>
      <div className="mt-3">
        <Skeleton count={10} />
      </div>
    </div>
  );
}
