import React from 'react';
import { Link } from 'react-router-dom';
import { faIndent } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export function VideoCard_Library_normal({ video }) {
    return (
        <div key={video.id} >
            <Link to={`/video/${video.id}`} style={{ textDecoration: "none" }}>
                <div className="videoCard">
                    {window.innerWidth < 610 ?
                        <img src={video.snippet.thumbnails.default.url} alt="" /> :
                        <img src={video.snippet.thumbnails.medium.url} style={{ width: "300px" }} alt="" />
                    }
                    <div style={{ marginLeft: "10px" }}>
                        <p style={{ textAlign: "start", color: "black" }}>{video.snippet.title}</p>
                        <p style={{ marginTop: "10px", textAlign: "start", color: "GrayText" }}>{video.snippet.channelTitle}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}
export function VideoCard_Library_playlist({ name, playlist }) {
    console.log(playlist);
    return (
        playlist.length > 0 ?
            <div key={playlist[0].id} >
                <Link to='/playlist' style={{ textDecoration: "none" }}>
                    <div className="videoCard">
                        <div className="playlist_cover">
                            <FontAwesomeIcon icon={faIndent} style={{color:"black",fontSize:"24px"}}/>
                        </div>
                        {window.innerWidth < 610 ?
                            <img src={playlist[0].snippet.thumbnails.default.url} alt="" /> :
                            <img src={playlist[0].snippet.thumbnails.medium.url} style={{ width: "300px" }} alt="" />
                        }
                            <p style={{
                                textAlign: "start",
                                color: "black",
                                fontSize: "20px",
                                fontWeight: "bold",
                                textAlign: "center"
                            }}>{name}</p>
                    </div>
                </Link>
            </div> : ""
    );
}
