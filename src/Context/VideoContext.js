import React, { useContext, createContext, useReducer } from 'react';
import video_reducer from '../Reducer/VideoReducer'
const VideoContext = createContext();
export function VideoProvider({ children }) {
    const [state, dispatch] = useReducer(video_reducer, {
        AllVideos:[],
        Playlist: [],
        WatchLater: [],
        HistoryList: [],
        LikedList: [],
    })
    return (
        <VideoContext.Provider
            value={{
                AllVideos:state.AllVideos,
                Playlist: state.Playlist,
                WatchLater: state.WatchLater,
                HistoryList: state.HistoryList,
                LikedList: state.LikedList,
                dispatch
            }}>
            {children}
        </VideoContext.Provider>
    );
}
export function useVideoContext() {
    return useContext(VideoContext)
}