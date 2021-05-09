import React, { useEffect, useState } from 'react';
import {
    faClock,
    faHistory,
    faIndent,
    faThumbsUp
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useVideoContext } from '../Context/VideoContext';
import { VideoCard_Library_normal, VideoCard_Library_playlist } from '../Components/VideoCard_Library'
import { Link } from 'react-router-dom'
export const Library = () => {
    const { HistoryList, Playlist, WatchLater, LikedList } = useVideoContext();
    const playlistKeys = Object.keys(Playlist)
    const [height, setHeight] = useState(0)
    const constHeight = window.innerHeight;
    const constNavHeight = document.querySelector('nav')?.clientHeight;
    useEffect(() => {
        setTimeout(() => {
            setHeight(
                document.querySelector('.library-box')?.clientHeight +
                constNavHeight
            );
        }, 100);
        if (!height)
            setHeight(0)
    }, []);

    return (
        <div style={{
            marginBottom: "4rem",
            height: height + constNavHeight < constHeight ? `${constHeight - constNavHeight}px` : `100%`
        }}>
            <div className='library-box'>
                <div className="library_heading">
                    <p className="library_inner_headings">
                        <FontAwesomeIcon icon={faHistory} />
                        <span style={{ marginLeft: "10px" }}>History</span>
                    </p>
                    <Link to='/history' style={{ textDecoration: "none", color: "var(--primary)", marginRight: "20px" }}>
                        See All
            </Link>
                </div>
                <div className="library_body">
                    {
                        HistoryList.length > 0 ?
                            HistoryList.map(history => <VideoCard_Library_normal video={history} />) :
                            <p className="videoCard-playlist-text">No History found</p>
                    }
                </div>
                <div className="library_heading">
                    <p className="library_inner_headings">
                        <FontAwesomeIcon icon={faClock} />
                        <span style={{ marginLeft: "10px" }}>Watch Later</span>
                    </p>
                    <Link to='/watch-later' style={{ textDecoration: "none", color: "var(--primary)", marginRight: "20px" }}>
                        See All
            </Link>
                </div>
                <div className="library_body">
                    {
                        WatchLater.length > 0 ?
                            WatchLater.map(watch => <VideoCard_Library_normal video={watch} />) :
                            <p className="videoCard-playlist-text">You are all caught up</p>
                    }
                </div>
                <div className="library_heading">
                    <p className="library_inner_headings">
                        <FontAwesomeIcon icon={faIndent} />
                        <span style={{ marginLeft: "10px" }}>Playlists</span>
                    </p>
                    <Link to='/playlist' style={{ textDecoration: "none", color: "var(--primary)", marginRight: "20px" }}>
                        See All
            </Link>
                </div>
                <div className="library_body">
                    {
                        playlistKeys.length > 0 ?
                            playlistKeys.map(watch => <VideoCard_Library_playlist name={watch} playlist={Playlist[watch]} />) :
                            <p className="videoCard-playlist-text">No playlist found</p>
                    }
                </div>
                <div className="library_heading">
                    <p className="library_inner_headings">
                        <FontAwesomeIcon icon={faThumbsUp} />
                        <span style={{ marginLeft: "10px" }}>Liked Videos</span>
                    </p>
                    <Link to='/liked' style={{ textDecoration: "none", color: "var(--primary)", marginRight: "20px" }}>
                        See All
            </Link>
                </div>
                <div className="library_body">
                    {
                        LikedList.length > 0 ?
                            LikedList.map(liked => <VideoCard_Library_normal video={liked} />) :
                            <p className="videoCard-playlist-text">No liked videos found</p>
                    }
                </div>
            </div>
        </div>
    );
}