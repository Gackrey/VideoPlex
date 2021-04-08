import React from 'react';
import { faTrash, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useVideoContext } from '../Context/VideoContext';
import { Link } from 'react-router-dom'
const Liked = () => {
    const { LikedList, dispatch } = useVideoContext();
    return (LikedList.length>0?
        <div>
            {LikedList.map(liked => {
                return (
                    <div style={{ display: "flex", margin: "10px" }}>
                        <Link to={`/video/${liked.id}`} style={{ textDecoration: "none" }}>
                            <div style={{ display: "flex" }}>
                                <img src={liked.snippet.thumbnails.default.url} alt="" />
                                <div style={{ marginLeft: "10px" }}>
                                    <p style={{ textAlign: "start", color: "black" }}>{liked.snippet.title}</p>
                                    <p style={{ marginTop: "10px", textAlign: "start", color: "GrayText" }}>{liked.snippet.channelTitle}</p>
                                </div>
                            </div>
                        </Link>
                        <FontAwesomeIcon style={{ marginLeft: "10px", cursor: "pointer", color: "gray" }} icon={faTrash}
                            onClick={() => dispatch({ type: "REMOVE_FROM_LIKED", payload: liked.id })} />
                    </div>
                )
            })}
        </div>:<h1>No Liked videos yet!</h1>
    )
}

export default Liked;
