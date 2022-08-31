import React from "react";
import { Link } from "react-router-dom";
import { useVideoContext } from "../Context/VideoContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { removeFromServer } from "../api/ServerHandler";
import { DateCalculator, ViewCalculator } from "../utils";

const VideoCard = ({ videos, list }) => {
  const { dispatch } = useVideoContext();
  async function removeFromPlaylist(newlist, newvideo) {
    await removeFromServer("updateplaylist", {
      name: newlist,
      delvideo: newvideo
    });
    dispatch({
      type: "REMOVE_FROM_PLAYLIST",
      payload: { name: newlist, Video: newvideo }
    });
  }
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {videos.map((video) => {
        return (
          <div key={video.id}>
            <div className="videoCard">
              <Link
                to={`/video/${video.id}`}
                style={{ textDecoration: "none" }}
              >
                <img
                  src={video.snippet.thumbnails.medium.url}
                  style={{ width: "300px" }}
                  alt=""
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
              </Link>
              <FontAwesomeIcon
                icon={faTrash}
                style={{
                  color: "red",
                  fontSize: "23px",
                  position: "absolute",
                  top: "10px",
                  right: "16px"
                }}
                onClick={() => removeFromPlaylist(list, video)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VideoCard;
