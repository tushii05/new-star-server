"use client";
import { useEffect } from "react";
import "./bootstrap.min.css";

export default function Bootstrap() {
  useEffect(() => {
    import("./bootstrap.bundle.min.js");
  }, []);

  return null;
}
