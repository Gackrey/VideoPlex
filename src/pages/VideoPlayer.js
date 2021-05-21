import React, { useState } from 'react';
import PlayListButton from '../Components/PlayListButton';
import RedirectBox from '../Components/RedirectBox'
import { useParams } from 'react-router-dom'
import { useVideoContext } from '../Context/VideoContext';
import { useAuth } from '../Context/AuthProvider';
import YouTube from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faIndent, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { addToServer,removeFromServer } from '../api/ServerHandler'
function ViewCalculator({ views }) {
    if (views > 1000000)
        return Math.round(views * 100 / 1000000) / 100 + 'M views'
    else
        return Math.round(views * 100 / 1000) / 100 + 'k views'
}
export const VideoPlayer = () => {
    const { AllVideos, LikedList, WatchLater, dispatch } = useVideoContext();
    const { isUserLogin } = useAuth()
    const { videoId } = useParams();
    const [dislikeState, setDislikeState] = useState(false);
    const [dislikeColor, setDislikeColor] = useState('gray');
    async function likeCounter(Video) {
        if (likeState) {
            setLikeState(false);
            setLikeColor('gray')
            dispatch({ type: "REMOVE_FROM_LIKED", payload: Video })
            await removeFromServer('liked',Video)
        }
        else {
            setDislikeColor('gray');
            setDislikeState(false);
            setLikeColor('#007bff');
            setLikeState(true)
            dispatch({ type: "ADD_TO_LIKED", payload: Video })
            await addToServer('liked',Video)
        }
    }
    async function dislikeCounter(Video) {
        if (dislikeState) {
            setDislikeState(false);
            setDislikeColor('gray')
        }
        else {
            setLikeState(false);
            setLikeColor('gray')
            setDislikeColor('#007bff');
            setDislikeState(true)
            dispatch({ type: "REMOVE_FROM_LIKED", payload: Video })
            await removeFromServer('liked',Video)
        }
    }
    async function watchCounter(Video) {
        if (laterState) {
            setLaterState(false);
            setLaterColor('gray')
            dispatch({ type: "REMOVE_FROM_WATCHLATER", payload: Video })
            await removeFromServer('watch-later',Video)
        }
        else {
            setLaterState(true)
            setLaterColor('#007bff');
            dispatch({ type: "ADD_TO_WATCHLATER", payload: Video })
            await addToServer('watch-later',Video)
        }
    }
    async function historyHandler(Video){
        dispatch({ type: "ADD_TO_HISTORY", payload: Video })
        await addToServer('history',Video)
    }
    function getVideo(videos, videoId) {
        return videos.find((video) => video.id === videoId);
    }
    const displayedVideo = getVideo(AllVideos, videoId);
    const likedVideo = getVideo(LikedList, videoId);
    const watchedVideo = getVideo(WatchLater, videoId);
    let currentLikeState = false, currentLaterState = false;
    if (likedVideo !== undefined)
        currentLikeState = true;
    if (watchedVideo !== undefined)
        currentLaterState = true;
    const [likeState, setLikeState] = useState(currentLikeState);
    const [laterState, setLaterState] = useState(currentLaterState);
    const [likeColor, setLikeColor] = useState(currentLikeState ? '#007bff' : 'gray');
    const [laterColor, setLaterColor] = useState(currentLaterState ? '#007bff' : 'gray');
    const variableHeight = window.innerWidth < 610 ? '320' : '530';
    const opts = {
        height: variableHeight,
        width: '100%',
        playerVars: {
            autoplay: 1,
        }
    };
    const [saveClick, setSaveState] = useState({ screen: "none", box: "none" });
    const [loginClick, setLoginState] = useState({ screen: "none", box: "none" });
    return (
        displayedVideo ?
            <div className="videoplayer" style={{ textAlign: "start" }}>
                <PlayListButton state={saveClick} video={displayedVideo} />
                <RedirectBox state={loginClick} />
                <br />
                <div>
                    <YouTube videoId={displayedVideo.id} opts={opts}
                        onPlay={() => historyHandler(displayedVideo) } />
                </div>
                <p className="title">{displayedVideo.snippet.title}</p>
                <div className="detailArea">
                    <span style={{ textAlign: "start", color: "GrayText" }}>
                        {<ViewCalculator views={displayedVideo.statistics.viewCount} />}
                    . {Date(displayedVideo.snippet.publishedAt).slice(3, 15)}
                    </span>
                    <div className="detailIconBox">
                        <div style={{ display: "flex", borderBottom: "4px solid gray", marginRight: "10px" }}>
                            <div style={{ margin: "0 10px", cursor: "pointer", color: likeColor }}
                                onClick={() => {
                                    if (isUserLogin)
                                        likeCounter(displayedVideo)
                                    else
                                        setLoginState({ screen: "flex", box: "block" })
                                }
                                }>
                                <FontAwesomeIcon icon={faThumbsUp} />
                                {Math.ceil(displayedVideo.statistics.likeCount / 1000)}k
                        </div>
                            <div style={{ cursor: "pointer", color: dislikeColor }}
                                onClick={() => {
                                    if (isUserLogin)
                                        dislikeCounter(displayedVideo)
                                    else
                                        setLoginState({ screen: "flex", box: "block" })
                                }
                                }>
                                <FontAwesomeIcon icon={faThumbsDown} />
                                {Math.ceil(displayedVideo.statistics.dislikeCount / 1000)}k
                        </div>
                        </div>
                        <div style={{ margin: "0 10px", cursor: "pointer", color: laterColor }}
                            onClick={() => {
                                if (isUserLogin) {
                                    watchCounter(displayedVideo)
                                }
                                else
                                    setLoginState({ screen: "flex", box: "block" })
                            }}>
                            <FontAwesomeIcon icon={faClock} />
                          Watch Later
                    </div>
                        <div style={{ margin: "0 10px", cursor: "pointer" }}
                            onClick={() => {
                                if (isUserLogin)
                                    setSaveState({ screen: "flex", box: "block" })
                                else
                                    setLoginState({ screen: "flex", box: "block" })
                            }
                            }>
                            <FontAwesomeIcon icon={faIndent} />
                        Save
                    </div>
                    </div>
                </div>
                <hr />
                <p style={{ fontWeight: "bold" }}>{displayedVideo.snippet.channelTitle}</p>
                <p className="description">{displayedVideo.snippet.description}</p>
                <br />
            </div> : <div></div>
    );
}