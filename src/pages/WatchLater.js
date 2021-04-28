import React, { useEffect, useState } from 'react';
import { faTrash, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useVideoContext } from '../Context/VideoContext';
import { Link } from 'react-router-dom'
const WatchLater = () => {
    const { WatchLater, dispatch } = useVideoContext();
    const [height, setHeight] = useState(0)
    const constHeight = window.innerHeight;
    const constNavHeight = document.querySelector('nav').clientHeight;
    useEffect(() => {
        setTimeout(() => {
            setHeight(
                WatchLater.length * document.querySelector('.watch-box')?.clientHeight +
                constNavHeight
            );
        }, 100);
        if (!height)
            setHeight(0)
    }, []);

    return (WatchLater.length > 0 ?
        <div className="watch-later" style={{
            marginBottom:"4rem",
            height: height + constNavHeight < constHeight  ? `${constHeight - constNavHeight}px` : `100%`
        }}>
            <br />
            <p style={{ textAlign: "start", fontSize: "20px", fontWeight: "bold", color: "GrayText" }}>
                Watch Later ({WatchLater.length} {WatchLater.length > 1 ? 'videos' : 'video'})
        </p>
            {WatchLater.map(later => {
                return (
                    <div key={later.id} className="watch-box">
                        <Link to={`/video/${later.id}`} style={{ textDecoration: "none" }}>
                            <div style={{ display: "flex" }}>
                                <img src={later.snippet.thumbnails.default.url} alt="" />
                                <div className="box-body">
                                    <p style={{ textAlign: "start" }}>{later.snippet.title}</p>
                                    <p style={{ marginTop: "10px", textAlign: "start" }}>{later.snippet.channelTitle}</p>
                                </div>
                            </div>
                        </Link>
                        <FontAwesomeIcon style={{ marginLeft: "10px", cursor: "pointer", color: "gray" }} icon={faTrash}
                            onClick={() => dispatch({ type: "REMOVE_FROM_WATCHLATER", payload: later.id })} />
                    </div>
                )
            })}
        </div> : <h1 style={{
            height: window.innerWidth < 610 ? `${window.innerHeight - 102}px` : `${window.innerHeight - 57}px`
        }} className="blank-page-text">You are all caught up!</h1>
    );
}

export default WatchLater;