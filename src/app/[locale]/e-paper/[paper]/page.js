import Epaper from "@/components/epaper/epaper";
import { getByIdEpaper } from "@/services/epaper.service";
import CustomLink from "@/utils/custom-link";

export default async function epaper({ params }) {
  const { paper, locale } = params;
  const epaper = await getByIdEpaper(paper);
  return (
    <section className="pb-4 pt-2 sec-news1">
      <div className="container px-lg-0">
        <div className="row ">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-12">
                <p className="mb-4 page-active text-uppercase">
                  <CustomLink href="/" lang={locale} name="HOME" /> |{" "}
                  <CustomLink href="/e-paper" lang={locale} name="E-paper" /> |{" "}
                  <CustomLink href={"/e-paper"} lang={locale} name={paper} />{" "}
                </p>
                {/* <h2 className="sec-heading text-dark text-uppercase mb-3">
                    E-Paper
                  </h2> */}
              </div>
            </div>

            <Epaper
              epaper={epaper}
              params={{ paper: "e-paper/" + paper, locale }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
