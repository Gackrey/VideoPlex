import React from 'react';
import { Link } from 'react-router-dom'
import { useVideoContext } from '../Context/VideoContext';

function DateCalculator({ date }) {
    let timeElapsed = Date.now() - Date.parse(date);
    let timeElapsed_inhours = Math.ceil(timeElapsed / 3600000);
    if (timeElapsed_inhours < 23)
        return timeElapsed_inhours + ' hours ago'
    else if (timeElapsed_inhours === 24)
        return Math.ceil(timeElapsed_inhours / 24) + ' day ago'
    else
        return Math.ceil(timeElapsed_inhours / 24) + ' days ago'
}
function ViewCalculator({ views }) {
    if (views > 1000000)
        return Math.round(views * 100 / 1000000) / 100 + 'M views'
    else
        return Math.round(views * 100 / 1000) / 100 + 'k views'
}
const VideoCard = ({ videos }) => {
    const {dispatch} = useVideoContext();
    return (
        <div style={{display:"flex",flexWrap:"wrap"}}>
            {
                videos.map(video => {
                    return(
                    <div key={video.id} >
                        <Link to={`/video/${video.id}`} style={{ textDecoration: "none" }}>
                            <div className="videoCard" onClick={() =>
                                dispatch({ type: "ADD_TO_HISTORY", payload: video })
                            }>
                                <img src={video.snippet.thumbnails.medium.url} style={{ width: "300px" }} alt="" />
                                <div style={{ marginLeft: "10px" }}>
                                    <p style={{ textAlign: "start", color: "black" }}>{video.snippet.title}</p>
                                    <p style={{ marginTop: "10px", textAlign: "start", color: "GrayText" }}>{video.snippet.channelTitle}</p>
                                    <p style={{ textAlign: "start", color: "GrayText" }}>{<ViewCalculator views={video.statistics.viewCount} />} . {<DateCalculator date={video.snippet.publishedAt} />}</p>
                                </div>
                            </div>
                        </Link>
                    </div>)
                })
            }
        </div>
    );
}

export default VideoCard;
