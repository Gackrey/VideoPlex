import React from 'react';
import {
    faClock,
    faHistory,
    faIndent,
    faThumbsUp
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useVideoContext } from '../Context/VideoContext';
import { VideoCard_Library_normal } from './VideoCard_Library'
import { Link } from 'react-router-dom'
const Library = () => {
    const { HistoryList, Playlist, WatchLater, LikedList } = useVideoContext();
    return (
        <div>
            <div className="library_heading">
                <p style={{ textAlign: "start", fontSize: "20px", fontWeight: "bold", color: "GrayText" }}>
                    <FontAwesomeIcon icon={faHistory} />
                    <span style={{ marginLeft: "10px" }}>History</span>
                </p>
                <Link to='/history' style={{ textDecoration: "none", color: "var(--primary)",marginRight:"20px" }}>
                    See All
            </Link>
            </div>
            <div className="library_body">
            {
                HistoryList.map(history => <VideoCard_Library_normal video= {history} />)
            }
            </div>
            <div className="library_heading">
                <p style={{ textAlign: "start", fontSize: "20px", fontWeight: "bold", color: "GrayText" }}>
                    <FontAwesomeIcon icon={faClock} />
                    <span style={{ marginLeft: "10px" }}>Watch Later</span>
                </p>
                <Link to='/watch-later' style={{ textDecoration: "none", color: "var(--primary)",marginRight:"20px" }}>
                    See All
            </Link>
            </div>
            <div className="library_body">
            {
                WatchLater.map(watch => <VideoCard_Library_normal video= {watch} />)
            }
            </div>
            <div className="library_heading">
                <p style={{ textAlign: "start", fontSize: "20px", fontWeight: "bold", color: "GrayText" }}>
                    <FontAwesomeIcon icon={faIndent} />
                    <span style={{ marginLeft: "10px" }}>Playlists</span>
                </p>
                <Link to='/playlist' style={{ textDecoration: "none", color: "var(--primary)",marginRight:"20px" }}>
                    See All
            </Link>
            </div>
            <div className="library_heading">
                <p style={{ textAlign: "start", fontSize: "20px", fontWeight: "bold", color: "GrayText" }}>
                    <FontAwesomeIcon icon={faThumbsUp} />
                    <span style={{ marginLeft: "10px" }}>Liked Videos</span>
                </p>
                <Link to='/liked' style={{ textDecoration: "none", color: "var(--primary)",marginRight:"20px" }}>
                    See All
            </Link>
            </div>
            <div className="library_body">
            {
                LikedList.map(liked => <VideoCard_Library_normal video= {liked} />)
            }
            </div>
        </div>
    );
}

export default Library;
