"use client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBar({ locale }) {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));

  useEffect(() => {
    if (current.get("title")) {
      setSearch(current.get("title"));
    }
  }, [current.get("title")]);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const value = search.trim();

    if (value) {
      if (!value) {
        current.delete("title");
      } else {
        current.set("title", search);
      }
      const searchQuery = current.toString();
      const query = searchQuery ? `?${searchQuery}` : "";
      const module = await import("@/utils/custom-lang-link");
      const customLangLink = module.default;
      router.push(customLangLink(`/search/${query}`, locale));
    }
  };

  return (
    <form
      className="col-lg-6 d-none d-lg-flex position-relative mt-2"
      onSubmit={handleSearchSubmit}
    >
      <input
        className="form-control w-100"
        placeholder="Search"
        name="search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <svg
        type="submit"
        onClick={handleSearchSubmit}
        className="search-icon"
        width={21}
        height={20}
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.125 18.625L14.9562 14.4562M17.2083 9.04167C17.2083 13.2758 13.7758 16.7083 9.54167 16.7083C5.30748 16.7083 1.875 13.2758 1.875 9.04167C1.875 4.80748 5.30748 1.375 9.54167 1.375C13.7758 1.375 17.2083 4.80748 17.2083 9.04167Z"
          stroke="#656565"
          strokeWidth="1.91667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="right-border" />
    </form>
  );
}
