import dynamic from "next/dynamic";
const OtpForm = dynamic(() => import("@/components/otpForm/opt-form"));

export default function OtpVerify({ params, searchParams }) {
  const { locale } = params;
  const { email } = searchParams;
  return (
    <section className="pb-4 pt-2 sec-news1">
      <div className="container px-lg-0 mb-5 pb-5">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-4 text-center reg-div">
            <h4 className="head mb-4 mt-3">Otp Verification</h4>
            <OtpForm locale={locale} email={email} />
          </div>
        </div>
      </div>
    </section>
  );
}
