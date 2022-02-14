import React from "react";
import { Link } from "react-router-dom";
import { useVideoContext } from "../Context/VideoContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { removeFromServer } from "../api/ServerHandler";
function DateCalculator({ date }) {
  let timeElapsed = Date.now() - Date.parse(date);
  let timeElapsed_inhours = Math.ceil(timeElapsed / 3600000);
  if (timeElapsed_inhours < 23) return timeElapsed_inhours + " hours ago";
  else if (timeElapsed_inhours === 24)
    return Math.ceil(timeElapsed_inhours / 24) + " day ago";
  else return Math.ceil(timeElapsed_inhours / 24) + " days ago";
}
function ViewCalculator({ views }) {
  if (views > 1000000)
    return Math.round((views * 100) / 1000000) / 100 + "M views";
  else return Math.round((views * 100) / 1000) / 100 + "k views";
}
const VideoCard = ({ videos, list }) => {
  const { dispatch } = useVideoContext();
  async function removeFromPlaylist(newlist, newvideo) {
    await removeFromServer("updateplaylist", {
      name: newlist,
      delvideo: newvideo,
    });
    dispatch({
      type: "REMOVE_FROM_PLAYLIST",
      payload: { name: newlist, Video: newvideo },
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
                  right: "16px",
                }}
                onClick={() => removeFromPlaylist(list,video)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VideoCard;
