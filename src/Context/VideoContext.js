import React, { useState,useContext, createContext, useReducer, useEffect } from 'react';
import axios from 'axios'
import reducer from '../Reducer/Reducer'
import { config } from '../config'
const VideoContext = createContext();
export function VideoProvider({ children }) {
    const [AllVideos,setVideoList] = useState([]);
    useEffect(() => {
        (async () => {
          const {
            data: { items },
          } = await axios.get(`${config.YOUTUBE_LINK}&key=${config.API_KEY}`);
          setVideoList(items);
        })();
      }, []);
    const [state, dispatch] = useReducer(reducer, {
        Playlist: {"My PlayList":[]},
        WatchLater: [],
        HistoryList: [],
        LikedList: []
    })
    return (
        <VideoContext.Provider
            value={{
                AllVideos,
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