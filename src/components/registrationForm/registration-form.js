"use client";
import registrationSchema from "@/schema/registration.schema";
import CustomLink from "@/utils/custom-link";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";

const EyeComponent = ({ showPassword, setShowPassword }) => {
  return (
    <span onClick={() => setShowPassword(!showPassword)}>
      {showPassword ? (
        <svg
          className="eye"
          width={20}
          height={20}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.25 9.14969C18.94 5.51969 15.56 3.42969 12 3.42969C10.22 3.42969 8.49 3.94969 6.91 4.91969C5.33 5.89969 3.91 7.32969 2.75 9.14969C1.75 10.7197 1.75 13.2697 2.75 14.8397C5.06 18.4797 8.44 20.5597 12 20.5597C13.78 20.5597 15.51 20.0397 17.09 19.0697C18.67 18.0897 20.09 16.6597 21.25 14.8397C22.25 13.2797 22.25 10.7197 21.25 9.14969ZM12 16.0397C9.76 16.0397 7.96 14.2297 7.96 11.9997C7.96 9.76969 9.76 7.95969 12 7.95969C14.24 7.95969 16.04 9.76969 16.04 11.9997C16.04 14.2297 14.24 16.0397 12 16.0397Z"
            fill="#9f9f9f"
          />

          <path
            d="M11.9984 9.14062C10.4284 9.14062 9.14844 10.4206 9.14844 12.0006C9.14844 13.5706 10.4284 14.8506 11.9984 14.8506C13.5684 14.8506 14.8584 13.5706 14.8584 12.0006C14.8584 10.4306 13.5684 9.14062 11.9984 9.14062Z"
            fill="#9f9f9f"
          />
        </svg>
      ) : (
        <svg
          className="eye"
          width={20}
          height={20}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.2714 9.17834C20.9814 8.71834 20.6714 8.28834 20.3514 7.88834C19.9814 7.41834 19.2814 7.37834 18.8614 7.79834L15.8614 10.7983C16.0814 11.4583 16.1214 12.2183 15.9214 13.0083C15.5714 14.4183 14.4314 15.5583 13.0214 15.9083C12.2314 16.1083 11.4714 16.0683 10.8114 15.8483C10.8114 15.8483 9.38141 17.2783 8.35141 18.3083C7.85141 18.8083 8.01141 19.6883 8.68141 19.9483C9.75141 20.3583 10.8614 20.5683 12.0014 20.5683C13.7814 20.5683 15.5114 20.0483 17.0914 19.0783C18.7014 18.0783 20.1514 16.6083 21.3214 14.7383C22.2714 13.2283 22.2214 10.6883 21.2714 9.17834Z"
            fill="#9f9f9f"
          />
          <path
            d="M14.0206 9.98062L9.98062 14.0206C9.47062 13.5006 9.14062 12.7806 9.14062 12.0006C9.14062 10.4306 10.4206 9.14062 12.0006 9.14062C12.7806 9.14062 13.5006 9.47062 14.0206 9.98062Z"
            fill="#9f9f9f"
          />
          <path
            d="M18.25 5.74969L14.86 9.13969C14.13 8.39969 13.12 7.95969 12 7.95969C9.76 7.95969 7.96 9.76969 7.96 11.9997C7.96 13.1197 8.41 14.1297 9.14 14.8597L5.76 18.2497H5.75C4.64 17.3497 3.62 16.1997 2.75 14.8397C1.75 13.2697 1.75 10.7197 2.75 9.14969C3.91 7.32969 5.33 5.89969 6.91 4.91969C8.49 3.95969 10.22 3.42969 12 3.42969C14.23 3.42969 16.39 4.24969 18.25 5.74969Z"
            fill="#9f9f9f"
          />
          <path
            d="M14.8581 11.9981C14.8581 13.5681 13.5781 14.8581 11.9981 14.8581C11.9381 14.8581 11.8881 14.8581 11.8281 14.8381L14.8381 11.8281C14.8581 11.8881 14.8581 11.9381 14.8581 11.9981Z"
            fill="#9f9f9f"
          />
          <path
            d="M21.7689 2.22891C21.4689 1.92891 20.9789 1.92891 20.6789 2.22891L2.22891 20.6889C1.92891 20.9889 1.92891 21.4789 2.22891 21.7789C2.37891 21.9189 2.56891 21.9989 2.76891 21.9989C2.96891 21.9989 3.15891 21.9189 3.30891 21.7689L21.7689 3.30891C22.0789 3.00891 22.0789 2.52891 21.7689 2.22891Z"
            fill="#9f9f9f"
          />
        </svg>
      )}
    </span>
  );
};

export default function RegistrationForm({ locale }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        username: "",
        password: "",
        confirm_password: "",
        termsAndConditions: 0,
      },
      validationSchema: registrationSchema,
      onSubmit: async (value) => {
        setLoading(true);
        const { confirm_password, ...restForm } = value;
        const module = await import("@/services/registration.service");
        const registrationService = module.registrationService;
        await registrationService(restForm, router, locale);
        setLoading(false);
      },
    });
  return (
    <form className="row d-flex justify-content-center" onSubmit={handleSubmit}>
      <div className="col-lg-12 text-start mb-3">
        <label>Username</label>
        <input
          className={`form-control ${
            errors.username && touched.username && `is-invalid`
          }`}
          placeholder="Enter your username"
          name="username"
          id="username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={loading}
        />
        {errors.username && touched.username ? (
          <div className="text-danger col-lg-12 text-start fw-bold">
            {errors.username}
          </div>
        ) : null}
      </div>
      <div className="col-lg-12 text-start mb-3">
        <label>Email</label>
        <input
          className={`form-control ${
            errors.email && touched.email && `is-invalid`
          }`}
          placeholder="Enter your email"
          name="email"
          id="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={loading}
        />{" "}
        {errors.email && touched.email ? (
          <div className="text-danger col-lg-12 text-start fw-bold">
            {errors.email}
          </div>
        ) : null}
      </div>
      <div className="col-lg-12 text-start mb-3 position-relative">
        <label>Password</label>
        <input
          className={`form-control ${
            errors.password && touched.password && `is-invalid`
          }`}
          placeholder="Enter your password"
          name="password"
          type={showPassword ? "text" : "password"}
          id="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={loading}
        />
        <EyeComponent
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
      </div>
      {errors.password && touched.password ? (
        <div
          className="text-danger col-lg-12 text-start fw-bold mb-3"
          style={{ marginTop: "-14px" }}
        >
          {errors.password}
        </div>
      ) : null}
      <div className="col-lg-12 text-start position-relative">
        <label>Confirm Password</label>
        <input
          className={`form-control ${
            errors.confirm_password && touched.confirm_password && ` is-invalid`
          }`}
          placeholder="Confirm password"
          name="confirm_password"
          id="confirm_password"
          type={showPassword ? "text" : "password"}
          value={values.confirm_password}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={loading}
        />
        <EyeComponent
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
      </div>
      {errors.confirm_password && touched.confirm_password ? (
        <div
          className="text-danger col-lg-12 text-start fw-bold mt-0 mb-1"
          // style={{ marginTop: "1px" }}
        >
          {errors.confirm_password}
        </div>
      ) : null}

      <div className="col-lg-12 text-start check-condision mt-2">
        <div className="form-check d-flex justify-content-start">
          <input
            type="checkbox"
            className="form-check-input"
            id="termsAndConditions"
            name="termsAndConditions"
            value={values.termsAndConditions}
            disabled={loading}
            onChange={(e) =>
              handleChange({
                target: {
                  name: e.target.name,
                  value: e.target.checked ? 1 : 0,
                },
              })
            }
            onBlur={handleBlur}
          />
          <label className="form-check-label ms-2" htmlFor="termsAndConditions">
            I have read and agree to the{" "}
            <CustomLink
              lang={locale}
              href="/terms-conditions"
              className="fw-bold"
            >
              Terms &amp; Conditions
            </CustomLink>
          </label>
        </div>
        {errors.termsAndConditions && touched.termsAndConditions ? (
          <div
            className="text-danger col-lg-12 text-start "
            // style={{ marginTop: "-15px" }}
          >
            {errors.termsAndConditions}
          </div>
        ) : null}
      </div>
      <div className="col-lg-12 text-center mt-1">
        <b>OR</b>
      </div>
      <div className="col-lg-12 text-center mb-3">
        <span className="register-google">Register with Google</span>
      </div>
      <div className="col-lg-12 text-start mb-3">
        <button
          className="btn btn-secondary btn-connect w-100 mb-3"
          type="button"
        >
          <Image
            src="/images/icon/Google.svg"
            className="img-fluid"
            width={100}
            height={100}
            alt="google-logo"
          />
          Connect with Google
        </button>
        <button className="btn btn-primary w-100 mb-3" type="submit">
          Register
        </button>
      </div>
    </form>
  );
}
