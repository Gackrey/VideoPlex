import React, { useEffect, useState } from 'react';
import { faTrash, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useVideoContext } from '../Context/VideoContext';
import { Link } from 'react-router-dom'
import { removeFromServer } from '../api/ServerHandler'
export const Liked = () => {
    const { LikedList, dispatch } = useVideoContext();
    const [height, setHeight] = useState(0)
    const constHeight = window.innerHeight;
    const constNavHeight = document.querySelector('nav')?.clientHeight;
    useEffect(() => {
        setTimeout(() => {
            setHeight(
                LikedList.length * document.querySelector('.liked-box')?.clientHeight +
                constNavHeight
            );
        }, 100);
        if (!height)
            setHeight(0)
    }, []);
    async function likeHandler(Video){
        await removeFromServer('liked',Video)
        dispatch({ type: "REMOVE_FROM_LIKED", payload: Video })
    }
    return (LikedList.length>0?
        <div className=" liked" style={{
            marginBottom:"4rem",
            height: height + constNavHeight < constHeight  ? `${constHeight - constNavHeight}px` : `100%`
        }}>
        <br/>
        <p className="library_inner_headings">
        Liked ({LikedList.length} {LikedList.length>1?'videos':'video'})
        </p>
            {LikedList.map(liked => {
                return (
                    <div key={liked.id} className="liked-box">
                        <Link to={`/video/${liked.id}`} style={{ textDecoration: "none"}}>
                            <div style={{ display: "flex" }}>
                                <img src={liked.snippet.thumbnails.default.url} alt="" />
                                <div className="box-body">
                                    <p style={{ textAlign: "start" }}>{liked.snippet.title}</p>
                                    <p style={{ marginTop: "10px", textAlign: "start" }}>{liked.snippet.channelTitle}</p>
                                </div>
                            </div>
                        </Link>
                        <FontAwesomeIcon style={{ marginLeft: "10px", cursor: "pointer", color: "gray" }} icon={faTrash}
                            onClick={() => likeHandler(liked)} />
                    </div>
                )
            })}
        </div>:<h1 style={{
            height:window.innerWidth < 610 ? `${window.innerHeight-102}px` : `${window.innerHeight-57}px`
        }} className="blank-page-text">No Liked videos yet!</h1>
    )
}