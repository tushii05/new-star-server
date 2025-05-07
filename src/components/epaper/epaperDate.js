"use client";
import customLangLink from "@/utils/custom-lang-link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EpaperDate({ locale }) {
  const [date, setDate] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const currentDate = searchParams.get("date");
    if (currentDate) {
      setDate(currentDate);
    }
  }, [searchParams]);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value.split("-").reverse().join("-");
    setDate(selectedDate);
  };

  useEffect(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (date) {
      current.set("date", date);
    } else {
      current.delete("date");
    }

    const query = current.toString();
    const queryString = query ? `?${query}` : "";
    router.push(customLangLink(`/e-paper/${queryString}`, locale));
  }, [date, searchParams, router, locale]);

  return (
    <div>
      <input
        type="date"
        data-date=""
        data-date-format="MM-DD-YYYY"
        className="form-control form-control-sm"
        value={date.split("-").reverse().join("-")}
        onChange={handleDateChange}
      />
    </div>
  );
}
