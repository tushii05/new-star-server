import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function WebStorySkeleton({ card }) {
  return (
    <div>
      {card ? (
        <div className="row">
          <div className="col-12">
            <p className="mb-4 page-active">
              <Skeleton width={200} />
            </p>
            <h2 className="sec-heading text-dark mb-3">
              <Skeleton width={100} />
            </h2>
          </div>
        </div>
      ) : null}
      <div className="detail-div bdr pb-4 web-stories-list">
        <div className="row">
          <div className="col-lg-4 col-md-4">
            <Skeleton height={355} className="img-fluid" />
          </div>
          <div className="col-lg-8 col-lg-8">
            <div className="row">
              <div className="col-12">
                <h1 className="news-card-heading">
                  <Skeleton height={30} count={1} />
                </h1>
                <p className="short-desc">
                  <Skeleton count={4} />
                </p>
              </div>
            </div>
            <div className="row news-date-time mt-2">
              <div className="col-12 d-flex pe-1">
                <Skeleton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
