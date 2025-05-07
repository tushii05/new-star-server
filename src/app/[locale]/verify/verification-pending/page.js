import OtpResend from "@/components/otpForm/opt-resend";

export default function Pending({ params }) {
  const { locale } = params;
  return (
    <section className="pb-4 pt-2 sec-news1">
      <div className="container px-lg-0 mb-5 pb-5">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-4 text-center reg-div">
            <h4 className="head mb-4 mt-3">Verification Pending</h4>
            <p>
              The email your trying to login is already exisit but the
              verification is pending
            </p>
            <OtpResend locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
