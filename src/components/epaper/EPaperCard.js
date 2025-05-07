"use client";
import CustomLink from "../../utils/custom-link";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function EPaperCard({ paper, locale }) {
  return (
    <div className={"col-lg-4 col-md-6 col-6"}>
      <div className="news-card card-icon-m1 single-page">
        <div className="epaper-card">
          <CustomLink lang={locale} href={`/e-paper/${paper?.id}`}>
            <div className="my-2">{paper?.epaper_group}</div>
            {paper?.image && (
              <Document
                renderMode="canvas"
                file={paper?.image}
                loading={<div className="sekeleton">Loading...</div>}
              >
                <Page
                  height={250}
                  width={150}
                  pageIndex={0}
                  loading={<div className="sekeleton">Loading...</div>}
                />
              </Document>
            )}
            <div className="my-2">{paper?.epaper_date}</div>
          </CustomLink>
        </div>
      </div>
    </div>
  );
}

// "use client";
// import { useEffect, useState } from "react";
// import CustomLink from "../../utils/custom-link";
// import { pdfjs } from "react-pdf";
// import Image from "next/image";

// // Set up the PDF.js worker
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// export default function EPaperCard({ paper, locale }) {
//   const [thumbnailUrl, setThumbnailUrl] = useState(null);

//   useEffect(() => {
//     const renderThumbnail = async () => {
//       if (!paper?.image) return;

//       try {
//         const pdf = await pdfjs.getDocument(paper.image).promise;
//         const page = await pdf.getPage(1);
//         const viewport = page.getViewport({ scale: 1 }); // Adjust scale for full page rendering

//         // Create an off-screen canvas
//         const canvas = document.createElement("canvas");
//         const context = canvas.getContext("2d");

//         canvas.width = viewport.width;
//         canvas.height = viewport.height;

//         // Render the page into the canvas
//         await page.render({ canvasContext: context, viewport }).promise;

//         // Convert the canvas to a data URL
//         setThumbnailUrl(canvas.toDataURL());
//       } catch (error) {
//         console.error("Error rendering PDF thumbnail:", error);
//       }
//     };

//     renderThumbnail();
//   }, [paper?.image]);

//   return (
//     <div className={"col-lg-3 col-md-6 col-6"}>
//       <div className="news-card card-icon-m1 single-page">
//         <div className="epaper-card">
//           <CustomLink lang={locale} href={`/e-paper/${paper?.id}`}>
//             {thumbnailUrl ? (
//               <Image
//                 src={thumbnailUrl}
//                 alt={`Thumbnail for ${paper?.epaper_group}`}
//                 width={235.766}
//                 height={246.359}
//                 loading="eager"
//               />
//             ) : (
//               <div className="sekeleton">Loading...</div>
//             )}
//           </CustomLink>
//         </div>
//         <div className="row pt-2 cat-row">
//           <div className="col-6">
//             <p className="cat-name mb-0">
//               <CustomLink lang={locale} href={`/e-paper/${paper?.id}`}>
//                 {paper?.epaper_group}
//               </CustomLink>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
