import React from "react";
import { Link } from "react-router-dom";
import { useVideoContext } from "../Context/VideoContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import ScrollToTop from "../Components/ScrollToTop";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
function ViewCalculator({ views }) {
  if (views > 1000000)
    return Math.round((views * 100) / 1000000) / 100 + "M views";
  else return Math.round((views * 100) / 1000) / 100 + "k views";
}
function DateCalculator({ date }) {
  let timeElapsed = Date.now() - Date.parse(date);
  let timeElapsed_inhours = Math.ceil(timeElapsed / 3600000);
  if (timeElapsed_inhours < 23) return timeElapsed_inhours + " hours ago";
  else if (timeElapsed_inhours === 24)
    return Math.ceil(timeElapsed_inhours / 24) + " day ago";
  else return Math.ceil(timeElapsed_inhours / 24) + " days ago";
}
export function AllVideosListing() {
  const { AllVideos } = useVideoContext();
  return (
    <div className="AllVideos">
      <ScrollToTop />
      {AllVideos.length > 0 ? (
        AllVideos.map((video) => {
          return (
            <div key={video.id}>
              <Link
                to={`/video/${video.id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="videoCard">
                  <LazyLoadImage
                    src={video.snippet.thumbnails.medium.url}
                    alt="Loading...."
                    effect="blur"
                    width="300px"
                  />
                  <div className="box-body">
                    <p style={{ textAlign: "start" }}>{video.snippet.title}</p>
                    <p style={{ marginTop: "10px", textAlign: "start" }}>
                      {video.snippet.channelTitle}
                    </p>
                    <p style={{ textAlign: "start" }}>
                      {<ViewCalculator views={video.statistics.viewCount} />} .{" "}
                      {<DateCalculator date={video.snippet.publishedAt} />}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })
      ) : (
        <Loader type="Bars" color="#00BFFF" className="center" height={80} width={80} />
      )}
    </div>
  );
}
