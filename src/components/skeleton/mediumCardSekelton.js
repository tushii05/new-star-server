import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function MeduimCardSkeleton({ card }) {
  return (
    <div>
      {card && (
        <div className="col-12">
          <p className="mb-4 page-active text-uppercase d-flex">
            <Skeleton width={100} height={16} />
          </p>
          <h2 className="sec-heading text-dark text-uppercase mb-2">
            <Skeleton width={200} height={16} />
          </h2>
        </div>
      )}
      <div className="row news-cat-three">
        {[...Array(4)].map((_, index) => (
          <div className="col-lg-6 col-md-10 bdr-bottom-1" key={index}>
            <div className="news-card card-icon-m1">
              <Skeleton
                width={386.656}
                height={246.359}
                className="img-fluid"
              />

              <div className="row pt-2 cat-row">
                <div className="col-6">
                  <p className="cat-name mb-0">
                    <Skeleton width={80} height={12} />
                  </p>
                </div>
                <div className="col-6 d-flex justify-content-end">
                  <p className="eye-icon mb-0 d-flex align-items-center">
                    <Skeleton width={40} height={12} />
                  </p>
                </div>
              </div>
              <h4 className="news-card-heading text-truncate-3">
                <Skeleton width={400} height={19} />
              </h4>
              <p className="news-card-desc mb-2 text-truncate-2">
                <Skeleton width={400} height={15} />
              </p>
              <div className="row news-date-time mt-2">
                <div className="col-6">
                  <Skeleton width={100} height={12} />
                </div>
                <div className="col-6 d-flex justify-content-end">
                  <p className="mb-0 d-flex">
                    <span className="date me-3">
                      <Skeleton width={30} height={12} />
                    </span>
                    <span className="time">
                      <Skeleton width={30} height={12} />
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}{" "}
      </div>
    </div>
  );
}
