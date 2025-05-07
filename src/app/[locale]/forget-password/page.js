import ForgetPasswordForm from "@/components/forget-password/forget-password-form";

export default function page({ params }) {
  const { locale } = params;
  return (
    <section className="pb-4 pt-2 sec-news1">
      <div className="container px-lg-0 mb-5 pb-5">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-4 text-center reg-div">
            <h4 className="head mb-4 mt-3">Forget Password</h4>
            <p>
              Enter the registered email address that will receive the one-time
              password.
            </p>
            <ForgetPasswordForm locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
