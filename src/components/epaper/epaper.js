// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { pdfjs, Document, Page } from "react-pdf";
// import "react-pdf/dist/Page/AnnotationLayer.css";
// import "react-pdf/dist/Page/TextLayer.css";
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// export default function Epaper({ epaper }) {
//   const [totalPages, settotalPages] = useState(0);
//   const [pageNumber, setpageNumber] = useState(1);
//   const [scale, setScale] = useState(1);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);
//   const [offset, setOffset] = useState({ x: 0, y: 0 });
//   const [pageWidth, setPageWidth] = useState(800); // Default width
//   const start = useRef({ x: 0, y: 0 });
//   const pdf = epaper?.image;
//   const ePaperRef = useRef(null);
//   const containerRef = useRef(null);

//   const changePage = (param) => {
//     if (param === "prev" && pageNumber > 1) {
//       setpageNumber((prev) => prev - 1);
//     } else if (param === "next" && pageNumber < totalPages) {
//       setpageNumber((prev) => prev + 1);
//     }
//   };

//   const zoomIn = () => setScale((prevScale) => prevScale + 0.1);
//   const zoomOut = () =>
//     setScale((prevScale) => (prevScale > 0.2 ? prevScale - 0.1 : prevScale));

//   const fullscreenAPI = {
//     enter: (element) => {
//       const method =
//         element.requestFullscreen ||
//         element.mozRequestFullScreen ||
//         element.webkitRequestFullscreen ||
//         element.msRequestFullscreen;
//       if (method) method.call(element);
//     },
//     exit: () => {
//       const method =
//         document.exitFullscreen ||
//         document.mozCancelFullScreen ||
//         document.webkitExitFullscreen ||
//         document.msExitFullscreen;
//       if (method) method.call(document);
//     },
//   };

//   const handleFullscreenToggle = () => {
//     if (isFullscreen) {
//       fullscreenAPI.exit();
//     } else {
//       fullscreenAPI.enter(ePaperRef.current);
//     }
//     setIsFullscreen(!isFullscreen);
//   };

//   const handleZoom = (deltaY, ctrlKey) => {
//     if (!ctrlKey) return;
//     setScale((prev) => {
//       let newScale = deltaY > 0 ? prev - 0.1 : prev + 0.1;
//       return Math.min(Math.max(newScale, 0.5), 4);
//     });
//   };

//   useEffect(() => {
//     const handleWheel = (e) => {
//       if (e.ctrlKey) {
//         e.preventDefault();
//         handleZoom(e.deltaY, e.ctrlKey);
//       }
//     };
//     window.addEventListener("wheel", handleWheel, { passive: false });
//     return () => window.removeEventListener("wheel", handleWheel);
//   }, []);

//   useEffect(() => {
//     if (containerRef.current) {
//       setPageWidth(containerRef.current.offsetWidth);
//     }
//   }, []);

//   return (
//     <div ref={ePaperRef} className="bg-light p-3">
//       <div className="row mb-4 border-bottom border-bottom-1 pb-2">
//         <div className="col-3">
//           <h4 className="m-0 p-0 fw-bold">{epaper?.epaper_group}</h4>
//         </div>
//         <div className="col-9">
//           <div className="row">
//             <div className="col-8 d-flex justify-content-center align-items-center gap-1">
//               <button
//                 className="cursor-pointer btn btn-primary btn-sm  plus-minus-btn"
//                 onClick={() => changePage("prev")}
//               >
//                 <svg
//                   width="7"
//                   height="12"
//                   viewBox="0 0 7 12"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M6 11L1 6L6 1"
//                     stroke="white"
//                     strokeWidth="1.66667"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//               </button>
//               <div className="px-3 py-1 rounded">{pageNumber}</div>
//               of
//               <div className="px-3 py-1 rounded">{totalPages}</div>
//               <button
//                 className="cursor-pointer btn btn-primary plus-minus-btn btn-sm"
//                 onClick={() => changePage("next")}
//               >
//                 <svg
//                   width="7"
//                   height="12"
//                   viewBox="0 0 7 12"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M1 11L6 6L1 1"
//                     stroke="white"
//                     strokeWidth="1.66667"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//               </button>
//             </div>
//             <div className="col-4">
//               <div className="d-flex justify-content-end align-items-center gap-2">
//                 <button
//                   className="cursor-pointer btn btn-primary btn-sm plus-minus-btn"
//                   onClick={zoomIn}
//                 >
//                   <svg
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M4 12H20M12 4V20"
//                       stroke="#ffffff"
//                       strokeWidth="2.4"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </button>
//                 <button
//                   className="cursor-pointer btn btn-primary btn-sm plus-minus-btn"
//                   onClick={zoomOut}
//                 >
//                   <svg
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M6 12L18 12"
//                       stroke="#ffffff"
//                       strokeWidth="2.4"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </button>
//                 <button
//                   className="cursor-pointer btn btn-primary btn-sm plus-minus-btn"
//                   onClick={handleFullscreenToggle}
//                 >
//                   {isFullscreen ? (
//                     <svg
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M7 9.5C8.38071 9.5 9.5 8.38071 9.5 7V2.5C9.5 1.94772 9.05228 1.5 8.5 1.5H7.5C6.94772 1.5 6.5 1.94772 6.5 2.5V6.5H2.5C1.94772 6.5 1.5 6.94772 1.5 7.5V8.5C1.5 9.05228 1.94772 9.5 2.5 9.5H7Z"
//                         fill="#ffffff"
//                       ></path>
//                       <path
//                         d="M17 9.5C15.6193 9.5 14.5 8.38071 14.5 7V2.5C14.5 1.94772 14.9477 1.5 15.5 1.5H16.5C17.0523 1.5 17.5 1.94772 17.5 2.5V6.5H21.5C22.0523 6.5 22.5 6.94772 22.5 7.5V8.5C22.5 9.05228 22.0523 9.5 21.5 9.5H17Z"
//                         fill="#ffffff"
//                       ></path>
//                       <path
//                         d="M17 14.5C15.6193 14.5 14.5 15.6193 14.5 17V21.5C14.5 22.0523 14.9477 22.5 15.5 22.5H16.5C17.0523 22.5 17.5 22.0523 17.5 21.5V17.5H21.5C22.0523 17.5 22.5 17.0523 22.5 16.5V15.5C22.5 14.9477 22.0523 14.5 21.5 14.5H17Z"
//                         fill="#ffffff"
//                       ></path>
//                       <path
//                         d="M9.5 17C9.5 15.6193 8.38071 14.5 7 14.5H2.5C1.94772 14.5 1.5 14.9477 1.5 15.5V16.5C1.5 17.0523 1.94772 17.5 2.5 17.5H6.5V21.5C6.5 22.0523 6.94772 22.5 7.5 22.5H8.5C9.05228 22.5 9.5 22.0523 9.5 21.5V17Z"
//                         fill="#ffffff"
//                       ></path>
//                     </svg>
//                   ) : (
//                     <svg
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M4 1.5C2.61929 1.5 1.5 2.61929 1.5 4V8.5C1.5 9.05228 1.94772 9.5 2.5 9.5H3.5C4.05228 9.5 4.5 9.05228 4.5 8.5V4.5H8.5C9.05228 4.5 9.5 4.05228 9.5 3.5V2.5C9.5 1.94772 9.05228 1.5 8.5 1.5H4Z"
//                         fill="#ffffff"
//                       ></path>
//                       <path
//                         d="M20 1.5C21.3807 1.5 22.5 2.61929 22.5 4V8.5C22.5 9.05228 22.0523 9.5 21.5 9.5H20.5C19.9477 9.5 19.5 9.05228 19.5 8.5V4.5H15.5C14.9477 4.5 14.5 4.05228 14.5 3.5V2.5C14.5 1.94772 14.9477 1.5 15.5 1.5H20Z"
//                         fill="#ffffff"
//                       ></path>
//                       <path
//                         d="M20 22.5C21.3807 22.5 22.5 21.3807 22.5 20V15.5C22.5 14.9477 22.0523 14.5 21.5 14.5H20.5C19.9477 14.5 19.5 14.9477 19.5 15.5V19.5H15.5C14.9477 19.5 14.5 19.9477 14.5 20.5V21.5C14.5 22.0523 14.9477 22.5 15.5 22.5H20Z"
//                         fill="#ffffff"
//                       ></path>
//                       <path
//                         d="M1.5 20C1.5 21.3807 2.61929 22.5 4 22.5H8.5C9.05228 22.5 9.5 22.0523 9.5 21.5V20.5C9.5 19.9477 9.05228 19.5 8.5 19.5H4.5V15.5C4.5 14.9477 4.05228 14.5 3.5 14.5H2.5C1.94772 14.5 1.5 14.9477 1.5 15.5V20Z"
//                         fill="#ffffff"
//                       ></path>
//                     </svg>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="row">
//         <Document
//           className={"col-2 epaper-options"}
//           file={pdf}
//           onLoadSuccess={(e) => settotalPages(e.numPages)}
//         >
//           {Array(totalPages)
//             .fill()
//             .map((_, index) => (
//               <div
//                 key={index}
//                 onClick={() => setpageNumber(index + 1)}
//                 className={`rounded my-2 side-pdf`}
//                 style={
//                   pageNumber === index + 1
//                     ? { border: "2px solid #1e3a8a" }
//                     : { border: "2px solid rgb(183, 189, 204)" }
//                 }
//               >
//                 <Page
//                   height={180}
//                   pageIndex={index}
//                   className="cursor-pointer"
//                 />
//               </div>
//             ))}
//         </Document>
//         <Document
//           className="col-10 read_epaper"
//           ref={containerRef}
//           file={pdf}
//           style={{
//             overflow: "hidden",
//             height: "100%",
//             position: "relative",
//             background: "#f9f9f9",
//             cursor: isDragging ? "grabbing" : "grab",
//           }}
//           onMouseDown={(e) => {
//             setIsDragging(true);
//             start.current = { x: e.clientX, y: e.clientY };
//           }}
//           onMouseMove={(e) => {
//             if (!isDragging) return;
//             const dx = e.clientX - start.current.x;
//             const dy = e.clientY - start.current.y;
//             start.current = { x: e.clientX, y: e.clientY };
//             setOffset((prev) => ({
//               x: prev.x + dx,
//               y: prev.y + dy,
//             }));
//           }}
//           onMouseUp={() => setIsDragging(false)}
//           onMouseLeave={() => setIsDragging(false)}
//         >
//           {" "}
//           <div
//             style={{
//               transform: `translate(${offset.x}px, ${offset.y}px)`,
//               transition: isDragging ? "none" : "transform 0.1s ease-out",
//               display: "flex",
//               justifyContent: "center",
//               padding: "20px 0",
//             }}
//           >
//             <Page
//               pageNumber={pageNumber}
//               scale={scale}
//               renderTextLayer={false}
//               renderAnnotationLayer={false}
//             />
//           </div>
//         </Document>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useEffect, useRef, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import ShareModalWrapper from "../share/shareModalWrapper";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function Epaper({ epaper, params }) {
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(0.4);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const start = useRef({ x: 0, y: 0 });
  const viewerRef = useRef(null);
  const ePaperRef = useRef(null);

  const pdf = epaper?.image;

  const changePage = (direction) => {
    setPageNumber((prev) =>
      direction === "prev"
        ? Math.max(prev - 1, 1)
        : Math.min(prev + 1, totalPages)
    );
  };

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 4));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.2));
  const handleZoom = (deltaY, ctrlKey) => {
    if (!ctrlKey) return;
    setScale((prev) => {
      const newScale = deltaY > 0 ? prev - 0.1 : prev + 0.1;
      return Math.min(Math.max(newScale, 0.5), 4);
    });
  };

  const fullscreenAPI = {
    enter: (element) =>
      element?.requestFullscreen?.() ||
      element?.mozRequestFullScreen?.() ||
      element?.webkitRequestFullscreen?.() ||
      element?.msRequestFullscreen?.(),
    exit: () =>
      document.exitFullscreen?.() ||
      document.mozCancelFullScreen?.() ||
      document.webkitExitFullscreen?.() ||
      document.msExitFullscreen?.(),
  };

  const handleFullscreenToggle = () => {
    if (isFullscreen) {
      fullscreenAPI.exit();
    } else {
      fullscreenAPI.enter(ePaperRef.current);
    }
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleWheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
        handleZoom(e.deltaY, e.ctrlKey);
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    start.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;
    start.current = { x: e.clientX, y: e.clientY };
    setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  return (
    <div ref={ePaperRef} className="bg-light p-3">
      {/* Header */}
      <div className="row mb-4 border-bottom pb-2">
        <div className="col-3">
          <h4 className="m-0 fw-bold">{epaper?.epaper_group}</h4>
        </div>
        <div className="col-9">
          <div className="row">
            <div className="col-8 d-flex align-items-center gap-2 justify-content-center">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => changePage("prev")}
              >
                Prev
              </button>
              <div>
                {pageNumber} / {totalPages}
              </div>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => changePage("next")}
              >
                Next
              </button>
            </div>
            <div className="col-4 d-flex justify-content-end gap-2">
              <button className="btn btn-primary btn-sm" onClick={zoomIn}>
                +
              </button>
              <button className="btn btn-primary btn-sm" onClick={zoomOut}>
                −
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={handleFullscreenToggle}
              >
                {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              </button>

              <ShareModalWrapper title={epaper?.epaper_group} params={params} />
            </div>
          </div>
        </div>
      </div>

      <div className="row vh-100">
        <div className="col-2 epaper-options">
          <Document
            file={pdf}
            onLoadSuccess={({ numPages }) => setTotalPages(numPages)}
            className="overflow"
          >
            {Array.from({ length: totalPages }, (_, index) => (
              <div
                key={`page_${index + 1}`}
                onClick={() => setPageNumber(index + 1)}
                className="my-2 rounded"
                style={{
                  border:
                    pageNumber === index + 1
                      ? "2px solid #1e3a8a"
                      : "2px solid #b7bdcc",
                  cursor: "pointer",
                }}
              >
                <Page
                  className="w-100"
                  pageIndex={index + 1}
                  height={240}
                  width={152}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </div>
            ))}
          </Document>
        </div>

        {/* Main Viewer */}
        <div
          className="col-10 read_epaper"
          style={{ overflow: "hidden", height: "100vh" }}
        >
          <div
            ref={viewerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px)`,
              cursor: isDragging ? "grabbing" : "grab",
              transition: isDragging ? "none" : "transform 0.1s ease-out",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Document file={pdf}>
              <Page
                key={"@" + scale}
                pageNumber={pageNumber}
                scale={scale}
                onRenderSuccess={() => {
                  setScale(scale);
                }}
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
            </Document>
          </div>
        </div>
      </div>
    </div>
  );
}
