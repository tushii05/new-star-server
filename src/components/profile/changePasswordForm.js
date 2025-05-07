"use client";
import { changePasswordSchema } from "@/schema/changePassword.schema";
import { changePassword } from "@/services/user.service";
import { useFormik } from "formik";
import React from "react";

export default function ChangePasswordForm({ user }) {
  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        currentPassword: "",
        newPassword: "",
        confirm_password: "",
      },
      validationSchema: changePasswordSchema,
      onSubmit: async (value) => {
        await changePassword({
          email: user.email,
          currentPassword: value.currentPassword,
          newPassword: value.newPassword,
        });
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-lg-12">
          <div className="md-form">
            <div className="row">
              <div className="col-lg-4 col-md-4 mb-3">
                <label>Old Password</label>
                <input
                  className={`form-control ${
                    errors.currentPassword &&
                    touched.currentPassword &&
                    `is-invalid`
                  }`}
                  placeholder="Old Password"
                  id="currentPassword"
                  name="currentPassword"
                  value={values.currentPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />{" "}
                {errors.currentPassword && touched.currentPassword ? (
                  <div className="text-danger">{errors.currentPassword}</div>
                ) : null}
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-4 mb-3">
                <label>New Password</label>
                <input
                  className={`form-control ${
                    errors.newPassword && touched.newPassword && `is-invalid`
                  }`}
                  placeholder="New Password"
                  id="newPassword"
                  name="newPassword"
                  value={values.newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />{" "}
                {errors.newPassword && touched.newPassword ? (
                  <div className="text-danger">{errors.newPassword}</div>
                ) : null}
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-4 mb-3">
                <label>Confirm Password</label>
                <input
                  className={`form-control ${
                    errors.confirm_password &&
                    touched.confirm_password &&
                    `is-invalid`
                  }`}
                  placeholder="Confirm Password"
                  id="confirm_password"
                  name="confirm_password"
                  value={values.confirm_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />{" "}
                {errors.confirm_password && touched.confirm_password ? (
                  <div className="text-danger">{errors.confirm_password}</div>
                ) : null}
              </div>
            </div>
            <div className="col-lg-12 col-md-12 mb-3">
              <button type="submit" className="btn btn-primary px-4">
                Changes Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
