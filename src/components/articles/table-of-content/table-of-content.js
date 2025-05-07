import Image from "next/image";
import CustomLink from "@/utils/custom-link";
import slugGenerator from "@/utils/slug-generator";
import { getMediaUrl } from "@/utils/getUrl";
import dynamic from "next/dynamic";
const HtmlContent = dynamic(() => import("@/utils/htmlContent"));

// Function to parse the PHP serialized string
function parsePhpSerializedString(serializedString) {
  const regex = /a:(\d+):{(.+)}/;
  const match = serializedString.match(regex);

  if (!match) return null;

  const totalElements = parseInt(match[1], 10);
  const elements = match[2];
  const result = {};

  const elementRegex =
    /i:(\d+);a:2:{s:5:"style";s:(\d+):"(.+?)";s:6:"status";i:(\d+);}/g;
  let elementMatch;

  while ((elementMatch = elementRegex.exec(elements)) !== null) {
    const index = parseInt(elementMatch[1], 10);
    const style = elementMatch[3];
    const status = parseInt(elementMatch[4], 10);

    result[index] = {
      style,
      status,
    };
  }

  return result;
}

export default function TableOfContent({
  tableOfContents,
  locale,
  link_list_style,
  slug,
}) {
  // Parse the serialized string
  const stylesList = Object.values(parsePhpSerializedString(link_list_style));

  // Function to get the style for the current level
  const getStyleForLevel = (level) => {
    const index = (level - 1) % stylesList.length; // Loop back if level exceeds styles list length
    const styleConfig = stylesList[index];
    return styleConfig.status === 1 ? styleConfig.style : "none"; // Apply style if status is active
  };

  // Recursive function to render the Table of Contents list with styles
  const renderList = (items, level = 1) => {
    return (
      <ol
        style={{
          listStyleType: getStyleForLevel(level),
          listStylePosition: "outside",
        }}
      >
        {items.map((item) => (
          <li key={item.id}>
            <CustomLink
              lang={locale}
              href={`/${slug}/#${slugGenerator(item?.title)}`}
            >
              {item?.title}
            </CustomLink>

            {/* Recursively render nested lists if there are children */}
            {item?.children?.length > 0 && renderList(item.children, level + 1)}
          </li>
        ))}
      </ol>
    );
  };

  // Recursive function to render the detailed content of each section
  const renderListData = (items, level = 1) => {
    return (
      <ol
        style={{
          listStyleType: getStyleForLevel(level),
          listStylePosition: "inside",
          paddingLeft: "0",
        }}
        className="table-list"
      >
        {items.map((item) => (
          <li
            key={item.id}
            className={`${level === 1 ? `` : `ps-4`}`}
            id={`${slugGenerator(item?.title)}`}
          >
            <span className="news-card-heading sorted">{item?.title}</span>
            <div>
              <div className="featured-img mt-3 article-image">
                <Image
                  width={1000}
                  height={1000}
                  src={item?.image ? getMediaUrl(item.image) : item?.image_url}
                  alt={item?.title ?? "article"}
                  className="img-fluid article-image"
                  loading="lazy"
                />
                <p className="img-credit">{item?.image_description}</p>
              </div>
              <div className="content-div mt-4">
                <HtmlContent data={item?.content} className="article-image" />
              </div>
            </div>

            {/* Recursively render nested sections if there are children */}
            {item?.children?.length > 0 &&
              renderListData(item.children, level + 1)}
          </li>
        ))}
      </ol>
    );
  };

  return (
    <>
      <div className="table-content">
        <h4 className="d-flex align-items-center">
          <svg
            className="me-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path d="M64 144a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM64 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48-208a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"></path>
          </svg>{" "}
          Table of Content
        </h4>
        {renderList(tableOfContents)}
      </div>

      {/* Render detailed content */}
      {renderListData(tableOfContents)}
    </>
  );
}
