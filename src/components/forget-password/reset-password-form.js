"use client";
import resetPasswordSchema from "@/schema/reset-password.schema";
import {
  forgetPasswordOptService,
  resetPasswordService,
} from "@/services/registration.service";
import { useFormik } from "formik";
import { useRouter } from "nextjs-toploader/app";
import React, { useState } from "react";

export default function ResetPasswordForm({ locale, email }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Initialize loading state

  const formik = useFormik({
    initialValues: {
      email: email || "",
      otp: "",
      newPassword: "",
      confirm_password: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (value) => {
      setLoading(true); // Set loading to true when form is submitted
      const { confirm_password, otp, ...restValues } = value;
      try {
        await resetPasswordService(
          { ...restValues, otp: +otp },
          router,
          locale
        );
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
    setLoading(true); // Set loading to true when resend OTP is clicked
    try {
      await forgetPasswordOptService({ email }, router, locale);
    } catch (error) {
      console.error(error); // Handle error if needed
    } finally {
      setLoading(false); // Reset loading state after the process completes
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
          value={values.otp}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength={6}
          disabled={loading} // Disable input when loading
        />
        {errors.otp && touched.otp && (
          <div className="text-danger">{errors.otp}</div>
        )}
      </div>
      <div className="col-lg-12 text-start mb-3">
        <label htmlFor="otp">New Password</label>
        <input
          className="form-control"
          placeholder="New Password"
          name="newPassword"
          id="newPassword"
          value={values.newPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={loading} // Disable input when loading
        />
        {errors.newPassword && touched.newPassword && (
          <div className="text-danger">{errors.newPassword}</div>
        )}
      </div>
      <div className="col-lg-12 text-start mb-3">
        <label htmlFor="otp">Confirm Password</label>
        <input
          className="form-control"
          placeholder="Confirm Password"
          name="confirm_password"
          id="confirm_password"
          value={values.confirm_password}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={loading} // Disable input when loading
        />
        {errors.confirm_password && touched.confirm_password && (
          <div className="text-danger">{errors.confirm_password}</div>
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
