import React, { useContext, createContext, useReducer } from 'react';
import reducer from '../Reducer/Reducer'
const VideoContext = createContext();
export function VideoProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, {
        AllVideos:[],
        Playlist: {"My PlayList":[]},
        WatchLater: [],
        HistoryList: [],
        LikedList: [],
        SearchResult:[],
        isSearched:false
    })
    return (
        <VideoContext.Provider
            value={{
                AllVideos:state.AllVideos,
                Playlist: state.Playlist,
                WatchLater: state.WatchLater,
                HistoryList: state.HistoryList,
                LikedList: state.LikedList,
                SearchResult:state.SearchResult,
                isSearched:state.isSearched,
                dispatch
            }}>
            {children}
        </VideoContext.Provider>
    );
}
export function useVideoContext() {
    return useContext(VideoContext)
}