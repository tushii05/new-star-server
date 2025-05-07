import CustomLink from "@/utils/custom-link";

export default function page({ params: { locale } }) {
  return (
    <div className="container vh-100 mt-5">
      <div className="row text-center">
        <h2>Not Found</h2>
        <p>The page you are looking is not here</p>
        <div className="col-12">
          <CustomLink lang={locale} href="/" className="btn btn-primary">
            Return Home
          </CustomLink>
        </div>
      </div>
    </div>
  );
}
