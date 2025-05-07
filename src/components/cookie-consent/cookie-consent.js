"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
const CookieConsentModal = dynamic(() => import("./cookie-consent-modal"));

export default function CookieConsent({ settings }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const isCookiesAvailable = document.cookie
      .split("; ")
      .some((cookie) => cookie.startsWith("cookieConsent="));

    if (settings?.cookies_warning && !isCookiesAvailable) {
      setOpen(true);
    }
  }, [settings?.cookies_warning]);

  const setCookie = (name, value, days) => {
    const expires = new Date();
    expires.setDate(expires.getDate() + days);
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
  };

  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  const handleAccept = () => {
    setOpen(false);
    setCookie("cookieConsent", "Hello Starsamachar", 365); // Cookie valid for 1 year
  };

  const handleReject = () => {
    setOpen(false);
    deleteCookie("cookieConsent");
  };

  return (
    <CookieConsentModal
      handleAccept={handleAccept}
      handleReject={handleReject}
      open={open}
      cookies_warning_text={settings?.cookies_warning_text}
    />
  );
}
