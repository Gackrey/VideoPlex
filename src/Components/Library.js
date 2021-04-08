import React from 'react';
import {
    faClock,
    faHistory,
    faIndent,
    faThumbsUp
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useVideoContext } from '../Context/VideoContext';
import { VideoCard_Library_normal,VideoCard_Library_playlist } from './VideoCard_Library'
import { Link } from 'react-router-dom'
const Library = () => {
    const { HistoryList, Playlist, WatchLater, LikedList } = useVideoContext();
    const playlistKeys = Object.keys(Playlist)
    return (
        <div className="library">
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
                HistoryList.length>0?
                HistoryList.map(history => <VideoCard_Library_normal video= {history} />):
                <p style={{textAlign:"center",width:"100%",fontSize:"20px"}}>No History found</p>
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
                WatchLater.length>0?
                WatchLater.map(watch => <VideoCard_Library_normal video= {watch} />):
                <p style={{textAlign:"center",width:"100%",fontSize:"20px"}}>You are all caught up</p>
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
            <div className="library_body">
            {
                playlistKeys.length>0?
                playlistKeys.map(watch => <VideoCard_Library_playlist name={watch} playlist={Playlist[watch]} />):
                <p style={{textAlign:"center",width:"100%",fontSize:"20px"}}>No playlist found</p>
            }
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
                LikedList.length>0?
                LikedList.map(liked => <VideoCard_Library_normal video= {liked} />):
                <p style={{textAlign:"center",width:"100%",fontSize:"20px"}}>No liked videos found</p>
            }
            </div>
        </div>
    );
}

export default Library;
