import Script from "next/script";
import { getMediaUrl } from "@/utils/getUrl";
import { logo } from "@/utils/getMetaData";

export default function AMPStory({ web_stories }) {
  return (
    <div className="web-story">
      <Script async defer src="https://cdn.ampproject.org/v0.js" />
      <Script
        async
        defer
        custom-element="amp-video"
        src="https://cdn.ampproject.org/v0/amp-video-0.1.js"
      />
      <Script
        async
        defer
        custom-element="amp-story"
        src="https://cdn.ampproject.org/v0/amp-story-1.0.js"
      />
      <Script
        async
        defer
        custom-element="amp-story-auto-ads"
        src="https://cdn.ampproject.org/v0/amp-story-auto-ads-0.1.js"
      />
      <Script
        async
        defer
        custom-element="amp-story-auto-analytics"
        src="https://cdn.ampproject.org/v0/amp-story-auto-analytics-0.1.js"
      />
      <Script
        async
        defer
        custom-element="amp-iframe"
        src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"
      />
      {web_stories?.length && (
        <amp-story
          standalone
          title="Star Media"
          publisher="Star Media"
          publisher-logo-src={logo}
          poster-portrait-src={logo}
        >
          {web_stories.map((story, index) => (
            <amp-story-page
              id={story?.title + index}
              auto-advance-after="7s"
              key={index}
            >
              <amp-story-grid-layer template="fill">
                <amp-img
                  src={story?.cover_image ? getMediaUrl(story.cover_image) : ""}
                  width="720"
                  height="1280"
                  layout="responsive"
                  loading="lazy"
                ></amp-img>
              </amp-story-grid-layer>

              <amp-story-grid-layer
                template="thirds"
                className="gradient_bottom"
              >
                <amp-img
                  src={logo}
                  height="50px"
                  width="50px"
                  className="amp-logo"
                ></amp-img>

                <div
                  className="title_content"
                  style={{ gridArea: "lower-third" }}
                  animate-in="fly-in-bottom"
                  animate-in-delay="0.2s"
                >
                  <div className="background_cover"></div>
                  <h2>{story?.title}</h2>
                  <p className="publisher t53">Agnito Media</p>
                </div>
              </amp-story-grid-layer>

              <amp-story-grid-layer template="vertical" className="bottom">
                <div className="image_credit">
                  <p>Image Credit: Starsamachar</p>
                </div>
              </amp-story-grid-layer>
            </amp-story-page>
          ))}
        </amp-story>
      )}
    </div>
  );
}
