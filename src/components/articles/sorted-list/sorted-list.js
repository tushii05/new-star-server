import Image from "next/image";
import { getMediaUrl } from "@/utils/getUrl";
import dynamic from "next/dynamic";
const HtmlContent = dynamic(() => import("@/utils/htmlContent"));

export default function SortedList({ sortedList }) {
  return sortedList?.length
    ? sortedList.map((data, index) => (
        <div>
          <div className="row">
            <div className="col-12 ">
              <h1 className="news-card-heading sorted">
                {index + 1}. {data?.title}
              </h1>
            </div>
          </div>
          <div className="featured-img mt-3 article-image">
            <Image
              width={1000}
              height={1000}
              src={data?.image ? getMediaUrl(data.image) : data?.image_url}
              alt={data?.title ?? "article"}
              className="img-fluid article-image"
              loading="lazy"
            />
            <p className="img-credit">{data?.image_description}</p>
          </div>
          <div className="content-div mt-4">
            <HtmlContent data={data?.content} className="article-image" />
          </div>
        </div>
      ))
    : null;
}
