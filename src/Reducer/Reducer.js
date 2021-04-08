export default function reducer(state, action) {
    switch (action.type) {
        case 'ADD_TO_HISTORY':
            let isAlreadyPresent = state.HistoryList.filter(item => item.id === action.payload.id)
            if (isAlreadyPresent.length === 0)
                return { ...state, HistoryList: state.HistoryList.concat(action.payload) }
            else
                return state;
        case 'REMOVE_FROM_HISTORY':
            return { ...state, HistoryList: state.HistoryList.filter(item => item.id !== action.payload) }
        case 'ADD_TO_LIKED':
            isAlreadyPresent = state.LikedList.filter(item => item.id === action.payload.id)
            if (isAlreadyPresent.length === 0)
                return { ...state, LikedList: state.LikedList.concat(action.payload) }
            else
                return state;
        case 'REMOVE_FROM_LIKED':
            return { ...state, LikedList: state.LikedList.filter(item => item.id !== action.payload.id) }
        case 'ADD_TO_WATCHLATER':
            isAlreadyPresent = state.WatchLater.filter(item => item.id === action.payload.id)
            if (isAlreadyPresent.length === 0)
                return { ...state, WatchLater: state.WatchLater.concat(action.payload) }
            else
                return state;
        case 'REMOVE_FROM_WATCHLATER':
            return { ...state, WatchLater: state.WatchLater.filter(item => item.id !== action.payload) }
        case 'CREATE_PLAYLIST':
            return { ...state, Playlist: { ...state.Playlist, [action.payload]: [] } }
        case 'ADD_TO_PLAYLIST':
            return {
                ...state,
                Playlist: {
                    ...state.Playlist,
                    [action.payload.name]:
                        [...state.Playlist[action.payload.name], action.payload.Video]
                }
            }
        case 'REMOVE_FROM_PLAYLIST':
            return {
                ...state,
                Playlist: {
                    ...state.Playlist,
                    [action.payload.name]:
                        state.Playlist[action.payload.name].filter(item => item.id !== action.payload.Id)
                }
            }
    }
}