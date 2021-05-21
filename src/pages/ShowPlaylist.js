import React, { useEffect, useState } from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useVideoContext } from '../Context/VideoContext'
import VideoCard from '../Components/VideoCard'
import { removeFromServer } from '../api/ServerHandler'
export const ShowPlayList = () => {
    const { Playlist, dispatch } = useVideoContext();
    const playlistKeys = Object.keys(Playlist);
    const [height, setHeight] = useState(0)
    const constHeight = window.innerHeight;
    const constNavHeight = document.querySelector('nav')?.clientHeight;
    useEffect(() => {
        setTimeout(() => {
            setHeight(
                playlistKeys.length * document.querySelector('.playlist-box')?.clientHeight +
                constNavHeight
            );
        }, 100);
        if (!height)
            setHeight(0)
    }, []);
    async function deletePlaylist(name){
        dispatch({ type: "DELETE_PLAYLIST", payload: name })
        await removeFromServer('newplaylist',{ name: name })
    }
    return (
        <div style={{
            marginBottom: "4rem",
            height: height + constNavHeight < constHeight ? `${constHeight - constNavHeight}px` : `100%`
        }}>
            {playlistKeys.length > 0 ?
                playlistKeys.map(item => {
                    return (
                        <div key={item} className="playlist-box">
                            <br />
                            <h1 className="blank-page-text">{item}
                                <FontAwesomeIcon icon={faTrash}
                                    style={{ marginLeft: "10px", cursor: "pointer" }}
                                    onClick={() => deletePlaylist(item)} />
                            </h1>
                            <br />
                            {
                                Playlist[item].length > 0 ?
                                    <VideoCard list={item} videos={Playlist[item]} /> :
                                    <p className="blank-page-text">No Videos in this playlist</p>
                            }
                        </div>
                    )
                })
                : <h1 style={{
                    height: window.innerWidth < 610 ? `${window.innerHeight - 102}px` : `${window.innerHeight - 57}px`
                }} className="blank-page-text">No Playlist Available</h1>
            }
        </div>
    )
}