import socialIcons from "./social-link-data";

export default function FollowUs({ data }) {
  const { obj, title } = data;

  // Convert object entries once for reuse
  const entries = Object.entries(obj);
  const validEntries = entries.filter(([_, value]) => value !== null);

  return validEntries.length ? (
    <>
      <div className="row">
        <div className="col-12">
          <h2 className="sec-heading text-dark text-uppercase">{title}</h2>
        </div>
      </div>
      <div className="row bdr">
        {validEntries.map(([key, value], index) => {
          const icon = socialIcons.find((icon) => key === icon.key)?.icon;
          const label = key.split("_")?.[0];

          return (
            <div
              className="col-lg-6 col-md-6 col-6 col-sm mb-3 pe-2"
              key={key + index}
            >
              <div className="social-share">
                <a
                  href={value}
                  className="btn btn-outline-dark w-100 d-flex justify-content-start align-items-center text-capitalize"
                >
                  {icon && <div className="me-1">{icon}</div>}
                  {label}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  ) : null;
}
