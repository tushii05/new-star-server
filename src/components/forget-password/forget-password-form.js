"use client";
import { forgetPasswordOptService } from "@/services/registration.service";
import { useRouter } from "nextjs-toploader/app";
import React, { useState, useCallback } from "react";

export default function ForgetPasswordForm({ locale }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleResendOtp = useCallback(async () => {
    setError("");
    if (!email) {
      setError("Email is required.");
      return;
    }

    try {
      setLoading(true);
      await forgetPasswordOptService({ email }, router, locale);
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [email, router]);

  return (
    <div className="row d-flex justify-content-center">
      <div className="col-lg-12 text-start mb-3">
        <label htmlFor="email">Email</label>
        <input
          className="form-control"
          placeholder="Email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <p className="text-danger mt-2">{error}</p>}
      </div>
      <div className="col-lg-12 text-start mb-3">
        <button
          className="btn btn-primary w-100 mb-3"
          onClick={handleResendOtp}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </div>
    </div>
  );
}
