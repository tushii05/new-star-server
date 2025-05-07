// import DOMPurify from "isomorphic-dompurify";
// export default function HtmlContent({ data, className, ...props }) {
//   return (
//     <div
//       {...props}
//       className={className}
//       dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data) }}
//     />
//   );
// }

import DOMPurify from "isomorphic-dompurify";

const processCaptions = (html) => {
  if (!html) return "";
  html = html.replace(/\r\n\r\n/g, "<br/>");
  html = html.replace(
    /\[caption id=".*?" align=".*?" width=".*?"]([\s\S]*?)\[\/caption]/g,
    (_, innerContent) => {
      const imgTagMatch = innerContent.match(/<img[^>]*>/);
      const captionTextMatch = innerContent.match(/(?:via:.*)$/);
      const imgTag = imgTagMatch ? imgTagMatch[0] : "";
      const captionText = captionTextMatch ? captionTextMatch[0] : "";
      return `<figure>${imgTag}<figcaption>${captionText}</figcaption></figure>`;
    }
  );
  return html;
};
const domPurifyConfig = {
  ADD_TAGS: ["iframe", "blockquote"],
  ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling", "src"],
};
export default function HtmlContent({ data, className, ...props }) {
  const processedData = processCaptions(data);
  return (
    <div
      {...props}
      className={className}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(processedData, domPurifyConfig),
      }}
    />
  );
}
