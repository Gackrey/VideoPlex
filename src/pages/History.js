import React from 'react';
import { faTrash, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useVideoContext } from '../Context/VideoContext';
import { Link } from 'react-router-dom'
const History = () => {
    const { HistoryList, dispatch } = useVideoContext();
    return (HistoryList.length > 0 ?
        <div className="history">
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
                            onClick={() => dispatch({ type: "REMOVE_FROM_HISTORY", payload: history.id })} />
                    </div>
                )
            })}
        </div> : <h1 style={{
            height: window.innerWidth < 610 ? `${window.innerHeight - 102}px` : `${window.innerHeight - 57}px`
        }} className="blank-page-text">No video history found</h1>
    );
}

export default History;
