export default function video_reducer(state, action) {
  switch (action.type) {
    case "INITIALIZE_VIDEOS":
      return {
        ...state,
        AllVideos: action.payload,
      };
    case "SET_DATA_FROM_SERVER":
      return {
        ...state,
        LikedList: action.payload.liked,
        HistoryList: action.payload.history,
        WatchLater: action.payload.watch_later,
        Playlist: action.payload.playlist,
      };
    case "ADD_TO_HISTORY":
      let isAlreadyPresent = state.HistoryList.filter(
        (item) => item.id === action.payload.id
      );
      if (isAlreadyPresent.length === 0)
        return {
          ...state,
          HistoryList: state.HistoryList.concat(action.payload),
        };
      else return state;
    case "REMOVE_FROM_HISTORY":
      return {
        ...state,
        HistoryList: state.HistoryList.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case "ADD_TO_LIKED":
      isAlreadyPresent = state.LikedList.filter(
        (item) => item.id === action.payload.id
      );
      if (isAlreadyPresent.length === 0)
        return { ...state, LikedList: state.LikedList.concat(action.payload) };
      else return state;
    case "REMOVE_FROM_LIKED":
      return {
        ...state,
        LikedList: state.LikedList.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case "ADD_TO_WATCHLATER":
      isAlreadyPresent = state.WatchLater.filter(
        (item) => item.id === action.payload.id
      );
      if (isAlreadyPresent.length === 0)
        return {
          ...state,
          WatchLater: state.WatchLater.concat(action.payload),
        };
      else return state;
    case "REMOVE_FROM_WATCHLATER":
      return {
        ...state,
        WatchLater: state.WatchLater.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case "CREATE_PLAYLIST":
      return {
        ...state,
        Playlist: [
          ...state.Playlist,
          { playlistName: [action.payload], playlistVideo: [] },
        ],
      };
    case "DELETE_PLAYLIST":
      return {
        ...state,
        Playlist: state.Playlist.filter(
          (item) => item.playlistName !== action.payload
        ),
      };
    case "ADD_TO_PLAYLIST":
      return {
        ...state,
        Playlist: state.Playlist.map((playlist) => {
          if (playlist.playlistName === action.payload.name)
            return {
              ...playlist,
              playlistVideo: [...playlist.playlistVideo, action.payload.Video],
            };
          else return playlist;
        }),
      };
    case "REMOVE_FROM_PLAYLIST":
      return {
        ...state,
        Playlist: state.Playlist.map((playlist) => {
          if (playlist.playlistName === action.payload.name)
            return {
              ...playlist,
              playlistVideo: playlist.playlistVideo.filter(
                (vid) => vid.id !== action.payload.Video.id
              ),
            };
        }),
      };
  }
}
