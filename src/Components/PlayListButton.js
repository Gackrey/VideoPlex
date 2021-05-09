import React, { useEffect, useState } from 'react';
import { useVideoContext } from '../Context/VideoContext'

const PlayListButton = ({ state, video }) => {
    function isInPlaylist(list) {
        let isFound = list.find(item => item.id === video.id);
        if (isFound === undefined)
            return false
        else return true
    }
    const { Playlist, dispatch } = useVideoContext();
    const playlistKeys = Object.keys(Playlist);
    const [boxDisplay, setBoxDisplay] = useState(state.box)
    const [ScreenDisplay, setScreenDisplay] = useState(state.screen)
    const [createPlaylistClicked, setClickedState] = useState(false);
    const [playlistName, setPlaylistName] = useState('')
    useEffect(() => {
        setBoxDisplay(state.box);
        setScreenDisplay(state.screen)
    }, [state]);
    return (
        <div className="playlistbox" style={{ display: ScreenDisplay }}>
            <div className="inner-pbox" style={{ display: boxDisplay }}>
                <div style={{ padding: "5px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p>Save to...</p>
                    <button className="btn-playlist-close"
                        onClick={() => { setBoxDisplay('none'), setScreenDisplay('none') }}
                    >X</button>
                </div>
                <hr />
                {
                    playlistKeys.map(list => {
                        return (
                            <label key={list} style={{ margin: "10px", display: "flex", justifyContent: "space-evenly" }}>
                                <input type="checkbox"
                                    checked={isInPlaylist(Playlist[list])}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            dispatch({
                                                type: "ADD_TO_PLAYLIST", payload: {
                                                    name: list,
                                                    Video: video
                                                }
                                            })
                                        }
                                        else {
                                            dispatch({
                                                type: "REMOVE_FROM_PLAYLIST", payload: {
                                                    name: list,
                                                    Id: video.id
                                                }
                                            })
                                        }
                                    }} />
                                {list}
                            </label>)
                    })
                }
                <hr />
                <p style={{
                    display: createPlaylistClicked ? "none" : "flex",
                    alignItems: "center",
                    padding: "0 6px",
                    cursor: "pointer"
                }}
                    onClick={() => setClickedState(true)}
                >
                    <span style={{ fontSize: "30px" }}>+</span>
                Create new playlist</p>

                <div style={{ display: createPlaylistClicked ? "block" : "none", marginLeft: "10px" }}>
                    <label style={{ fontSize: "14px" }}>
                        Name
                        <input type="text" value={playlistName}
                            placeholder="Enter playlist name..."
                            className="new-playlist"
                            onChange={(e) => setPlaylistName(e.target.value)}
                        />
                    </label>
                    <button className="createPlaylist-btn"
                        onClick={() => {
                            setClickedState(false)
                            dispatch({ type: "CREATE_PLAYLIST", payload: playlistName })
                            setClickedState(false)
                            setPlaylistName('')
                        }}
                    >CREATE</button>
                </div>
            </div>
        </div>
    );
}

export default PlayListButton;
