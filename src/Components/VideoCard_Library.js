import React from 'react';
import { Link } from 'react-router-dom'
export function VideoCard_Library_normal({ video }) {
    return (
        <div key={video.id} >
            <Link to={`/video/${video.id}`} style={{ textDecoration: "none" }}>
                <div className="videoCard">
                    <img src={video.snippet.thumbnails.medium.url} style={{ width: "300px" }} alt="" />
                    <div style={{ marginLeft: "10px" }}>
                        <p style={{ textAlign: "start", color: "black" }}>{video.snippet.title}</p>
                        <p style={{ marginTop: "10px", textAlign: "start", color: "GrayText" }}>{video.snippet.channelTitle}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}
