import React, { useState, useEffect } from 'react';
import { faTrash, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useVideoContext } from '../Context/VideoContext';
import { Link } from 'react-router-dom'
import { removeFromServer } from '../api/ServerHandler'
export const History = () => {
    const [height, setHeight] = useState(0)
    const constHeight = window.innerHeight;
    const constNavHeight = document.querySelector('nav')?.clientHeight;
    const { HistoryList, dispatch } = useVideoContext();
    useEffect(() => {
        setTimeout(() => {
            setHeight(
                HistoryList.length * document.querySelector('.history-box')?.clientHeight +
                constNavHeight
            );
        }, 100);
        if (!height)
            setHeight(0)
    }, []);
    async function historyHandler(Video){
        dispatch({ type: "REMOVE_FROM_HISTORY", payload: Video })
        await removeFromServer('history',Video)
    }
    return (HistoryList.length > 0 ?
        <div className="history" style={{
            marginBottom:"4rem",
            height: height + constNavHeight < constHeight  ? `${constHeight - constNavHeight}px` : `100%`
        }}>
            {HistoryList.map(history => {
                return (
                    <div key={history.id} className="history-box">
                        <Link to={`/video/${history.id}`} style={{ textDecoration: "none" }}>
                            <div style={{ display: "flex" }}>
                                <img src={history.snippet.thumbnails.default.url} alt="" />
                                <div className="box-body">
                                    <p style={{ textAlign: "start" }}>{history.snippet.title}</p>
                                    <p style={{ marginTop: "10px", textAlign: "start" }}>{history.snippet.channelTitle}</p>
                                </div>
                            </div>
                        </Link>
                        <FontAwesomeIcon style={{ marginLeft: "10px", cursor: "pointer", color: "gray" }} icon={faTrash}
                            onClick={() => historyHandler(history)} />
                    </div>
                )
            })}
        </div> : <h1 style={{
            height: window.innerWidth < 610 ? `${window.innerHeight - 102}px` : `${window.innerHeight - 57}px`
        }} className="blank-page-text">No video history found</h1>
    );
}
