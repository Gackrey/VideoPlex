import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useVideoContext } from '../Context/VideoContext'
import VideoCard from './VideoCard'
export function ShowPlayList() {
    const { Playlist, dispatch } = useVideoContext();
    const playlistKeys = Object.keys(Playlist);
    return (Object.keys(Playlist).length > 0 ?
        <div>
            {
                playlistKeys.map(item => {
                    return (
                        <div>
                            <h1>{item}
                                <FontAwesomeIcon icon={faTrash}
                                    style={{ marginLeft: "10px" }}
                                    onClick={() => dispatch({ type: "DELETE_PLAYLIST", payload: item })} />
                            </h1>
                            <br />
                            {
                                Playlist[item].length > 0 ? 
                                <VideoCard list={item} videos={Playlist[item]} /> : 
                                <p>No Videos in this playlist</p>
                            }
                        </div>
                    )
                })
            }
        </div>
        : <h1>No Playlist Available</h1>
    )
}