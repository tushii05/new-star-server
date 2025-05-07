"use client";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const handleForm = async () => {
    const module = import("@/services/subscribers.service");
    const subscribers = (await module).default;
    await subscribers({ email });
    setEmail("");
  };
  return (
    <>
      <input
        className="form-control"
        placeholder="Email"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="btn btn-primary w-100 mt-2"
        type="button"
        onClick={handleForm}
      >
        Subscribe
      </button>
    </>
  );
}
