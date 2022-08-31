import React from "react";
import { Link } from "react-router-dom";
import { useVideoContext } from "../Context/VideoContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import ScrollToTop from "../Components/ScrollToTop";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { DateCalculator, ViewCalculator } from "../utils";

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
        <Loader
          type="Bars"
          color="#00BFFF"
          className="center"
          height={80}
          width={80}
        />
      )}
    </div>
  );
}
