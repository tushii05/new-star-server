import Bootstrap from "@/lib/bootstrap/bootstrap";
import React from "react";

export default function MaintenanceMode({ generalSettings, locale }) {
  return (
    <html lang={locale}>
      <Bootstrap />
      <body className={"signup-body"}>
        <div className="row text-center mt-5">
          <h2 className="col-12">{generalSettings?.maintenance_mode_title}</h2>
          <p className="col-12">
            {generalSettings?.maintenance_mode_description}
          </p>
        </div>
      </body>
    </html>
  );
}
