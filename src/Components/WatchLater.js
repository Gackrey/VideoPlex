import React from 'react';
import { faTrash, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useVideoContext } from '../Context/VideoContext';
import { Link } from 'react-router-dom'
const WatchLater = () => {
    const { WatchLater, dispatch } = useVideoContext();
    return (WatchLater.length>0?
        <div>
            {WatchLater.map(later => {
                return (
                    <div key={later.id} style={{ display: "flex", margin: "10px" }}>
                        <Link to={`/video/${later.id}`} style={{ textDecoration: "none" }}>
                            <div style={{ display: "flex" }}>
                                <img src={later.snippet.thumbnails.default.url} alt="" />
                                <div style={{ marginLeft: "10px" }}>
                                    <p style={{ textAlign: "start", color: "black" }}>{later.snippet.title}</p>
                                    <p style={{ marginTop: "10px", textAlign: "start", color: "GrayText" }}>{later.snippet.channelTitle}</p>
                                </div>
                            </div>
                        </Link>
                        <FontAwesomeIcon style={{ marginLeft: "10px", cursor: "pointer", color: "gray" }} icon={faTrash}
                            onClick={() =>  dispatch({ type: "REMOVE_FROM_WATCHLATER", payload: later.id }) } />
                    </div>
                )
            })}
        </div>:<h1>You are all caught up!</h1>
    );
}

export default WatchLater;