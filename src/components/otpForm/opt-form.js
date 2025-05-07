"use client";
import otpSchema from "@/schema/otp.schema";
import { optService, resendOptService } from "@/services/registration.service";
import { useFormik } from "formik";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";

export default function OtpForm({ locale, email }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Initialize loading state

  const formik = useFormik({
    initialValues: {
      email: email || "",
      otp: "",
    },
    validationSchema: otpSchema,
    onSubmit: async (value) => {
      setLoading(true); // Set loading to true when form is submitted
      try {
        await optService(value, router, locale);
      } catch (error) {
        console.error(error); // Handle error if needed
      } finally {
        setLoading(false); // Set loading to false after the process completes
      }
    },
  });

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    formik;

  const handleResendOtp = async () => {
    try {
      await resendOptService({ email }, router, locale);
    } catch (error) {
      console.error(error); // Handle error if needed
    }
  };

  return (
    <form className="row d-flex justify-content-center" onSubmit={handleSubmit}>
      <div className="col-lg-12 text-start mb-3">
        <label htmlFor="otp">OTP</label>
        <input
          className="form-control"
          placeholder="OTP"
          name="otp"
          id="otp"
          type="tele"
          value={values.otp}
          onChange={(e) => {
            const v = e.target.value;
            if (/^\d*$/.test(v)) {
              handleChange(e);
            }
          }}
          onBlur={handleBlur}
          maxLength={6}
          disabled={loading} // Disable input when loading
        />
        {errors.otp && touched.otp && (
          <div className="text-danger">{errors.otp}</div>
        )}
      </div>
      <div className="col-lg-12 text-end mb-3">
        <a
          className="reset-password"
          style={{ cursor: "pointer" }}
          onClick={handleResendOtp}
        >
          {loading ? "Resending..." : "Resend Otp?"} {/* Show loading text */}
        </a>
      </div>
      <div className="col-lg-12 text-start mb-3">
        <button
          className="btn btn-primary w-100 mb-3"
          type="submit"
          disabled={loading} // Disable button when loading
        >
          {loading ? "Verifying..." : "Verify"} {/* Show loading text */}
        </button>
      </div>
    </form>
  );
}
