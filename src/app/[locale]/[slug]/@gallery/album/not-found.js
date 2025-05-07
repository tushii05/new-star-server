"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container vh-100 mt-5">
      <div className="row text-center">
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <div className="col-12">
          <Link href="/" className="btn btn-primary">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
