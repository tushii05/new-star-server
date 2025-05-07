"use client";
import { deleteAccountFormSchema } from "@/schema/deleteAccountForm.schema";
import { deleteAccount } from "@/services/user.service";
import { useFormik } from "formik";
import React from "react";

export default function DeleteAccountForm({ user }) {
  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        password: "",
        checkbox: 0,
      },
      validationSchema: deleteAccountFormSchema,
      onSubmit: async (value) => {
        await deleteAccount(
          {
            password: value.password,
          },
          user?.id
        );
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-lg-12">
          <div className="md-form">
            <div className="row">
              <div className="col-lg-4 col-md-4 mb-3">
                <label>Password</label>
                <input
                  className={`form-control ${
                    errors.password && touched.password && `is-invalid`
                  }`}
                  placeholder="Password"
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />{" "}
                {errors.password && touched.password ? (
                  <div className="text-danger">{errors.password}</div>
                ) : null}
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="checkbox"
                  name="checkbox"
                  onChange={(e) => {
                    handleChange({
                      target: {
                        name: e.target.name,
                        value: e.target.checked ? 1 : 0,
                      },
                    });
                  }}
                  onBlur={handleBlur}
                />{" "}
                <label className="form-check-label">
                  Deleting your account is permanent and will remove all content
                  including comments, avatars and profile settings. Are you sure
                  you want to delete your account?
                </label>
                {errors.checkbox && touched.checkbox ? (
                  <div className="text-danger">{errors.checkbox}</div>
                ) : null}
              </div>
            </div>

            <div className="col-lg-12 col-md-12 mb-3">
              <button type="submit" className="btn btn-primary px-4">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
