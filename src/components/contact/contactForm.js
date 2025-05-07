"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import { contactService } from "@/services/contact.service";
import contactSchema from "@/schema/contact.schema";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
      checkBox: false,
    },
    validationSchema: contactSchema,
    onSubmit: async (value) => {
      setLoading(true);
      try {
        await contactService(value);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="row d-flex justify-content-center">
        <div className="col-lg-6 col-12 text-start mb-3">
          <label htmlFor="name">Name</label>
          <input
            className={`form-control ${
              formik.errors.name && formik.touched.name && `is-invalid`
            }`}
            placeholder="Enter your name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={loading} // Disable input when loading
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="text-danger">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="col-lg-6 col-12 text-start mb-3">
          <label htmlFor="email">Email</label>
          <input
            className={`form-control ${
              formik.errors.email && formik.touched.email && `is-invalid`
            }`}
            placeholder="Enter your email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={loading} // Disable input when loading
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="text-danger">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="col-lg-12 text-start mb-3 position-relative">
          <label htmlFor="message">Message</label>
          <textarea
            className={`form-control textarea87 ${
              formik.errors.message && formik.touched.message && `is-invalid`
            }`}
            style={{ minHeight: "87px" }}
            placeholder="Message"
            rows={5}
            name="message"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={loading} // Disable textarea when loading
          />
          {formik.errors.message && formik.touched.message ? (
            <div className="text-danger">{formik.errors.message}</div>
          ) : null}
        </div>
        <div className="col-lg-12 text-start check-condision mb-3 mt-2">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              name="checkBox"
              checked={formik.values.checkBox}
              onChange={formik.handleChange}
              disabled={loading} // Disable checkbox when loading
            />
            <label className="form-check-label ms-2" htmlFor="exampleCheck1">
              I have read and agree to the{" "}
              <a href="#" className="fw-bold bl-color">
                Terms &amp; Conditions
              </a>
            </label>
          </div>
          {formik.errors.checkBox && formik.touched.checkBox ? (
            <div className="text-danger">{formik.errors.checkBox}</div>
          ) : null}
        </div>
        <div className="col-lg-12 text-start mb-3">
          <button
            className="btn btn-primary w-100 mb-3"
            type="submit"
            disabled={loading} // Disable button when loading
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
}
