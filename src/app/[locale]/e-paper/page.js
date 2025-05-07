import EPaperCard from "@/components/epaper/EPaperCard";
import PageLayout from "@/components/layout/pageLayout";
import CustomLink from "@/utils/custom-link";
import { getAllEpaper } from "@/services/epaper.service";
import LoadMoreEpaper from "./load-more-widget";
import EpaperDate from "@/components/epaper/epaperDate";

export default async function Epaper({ params, searchParams }) {
  const { locale } = params;
  const date = searchParams?.date;
  const { epaper } = await getAllEpaper(1, 10, date || "");
  const currentSearchParams = new URLSearchParams();
  for (const key in searchParams) {
    currentSearchParams.append(key, searchParams[key]);
  }

  return (
    <>
      <div className="row">
        <div className="col-12">
          <p className="mb-4 page-active text-uppercase">
            <CustomLink href="/" lang={locale} name="HOME" /> |{" "}
            <CustomLink href="/e-paper" lang={locale} name="E-paper" />
          </p>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="sec-heading text-dark text-uppercase mb-3">
              E-Paper
            </h2>
            <EpaperDate locale={locale} />
          </div>
        </div>
      </div>
      <div className="row news-cat-three">
        {epaper?.length ? (
          epaper.map((item, index) => (
            <EPaperCard paper={item} key={index} locale={locale} />
          ))
        ) : (
          <p>No E-papers available</p>
        )}
        <LoadMoreEpaper params={params} date={date} />
      </div>
    </>
  );
}
