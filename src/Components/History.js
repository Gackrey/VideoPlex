import React from 'react';
import { faTrash, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useVideoContext } from '../Context/VideoContext';
import { Link } from 'react-router-dom'
const History = () => {
    const { HistoryList, dispatch } = useVideoContext();
    return (HistoryList.length>0?
        <div>
            {HistoryList.map(history => {
                return (
                    <div key={history.id} style={{ display: "flex", margin: "10px",border:"1px solid black",padding:"10px" }}>
                        <Link to={`/video/${history.id}`} style={{ textDecoration: "none" }}>
                            <div style={{ display: "flex" }}>
                                <img src={history.snippet.thumbnails.default.url} alt="" />
                                <div style={{ marginLeft: "10px" }}>
                                    <p style={{ textAlign: "start", color: "black" }}>{history.snippet.title}</p>
                                    <p style={{ marginTop: "10px", textAlign: "start", color: "GrayText" }}>{history.snippet.channelTitle}</p>
                                </div>
                            </div>
                        </Link>
                        <FontAwesomeIcon style={{ marginLeft: "10px", cursor: "pointer", color: "gray" }} icon={faTrash}
                            onClick={() => dispatch({ type: "REMOVE_FROM_HISTORY", payload: history.id }) } />
                    </div>
                )
            })}
        </div>:<h1>No video history found</h1>
    );
}

export default History;
