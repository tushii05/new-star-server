import RegistrationForm from "@/components/registrationForm/registration-form";

export default function Registration({ params }) {
  const { locale } = params;
  return (
    <section className="pb-4 pt-2 sec-news1">
      <div className="container px-lg-0 mb-5 pb-5">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-4 text-center reg-div">
            <h4 className="head mb-4 mt-3">Register</h4>
            <RegistrationForm locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
