import "./styles.css";
import { Routes, Route } from 'react-router-dom'
import { AllVideosListing } from './Components/AllVideos'
import { ShowPlayList } from './Components/ShowPlaylist'
import Liked from './Components/Liked'
import { NotFound } from './Components/NotFound'
import WatchLater from './Components/WatchLater'
import VideoPlayer from './Components/VideoPlayer'
import Navbar from './Components/Navbar'
import SideBar from './Components/SideBar'
import Library from './Components/Library'
import History from './Components/History'
import { config } from './config';
import axios from 'axios'
import { useVideoContext } from './Context/VideoContext'
import { useEffect } from 'react'

export default function App() {
  const { AllVideos, dispatch } = useVideoContext();
  async function getDateFromAPI() {
    try {
      const response = await axios.get(`${config.YOUTUBE_LINK}&key=${config.API_KEY}`);
      dispatch({ type: "INITIALIZE_VIDEOS", payload: response.data.items })
    }
    catch (error) {
      console.error("Error", error)
    }
  }

  useEffect(() => {
    AllVideos.length === 0 && getDateFromAPI()
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div className="mainPreview">
        <SideBar />
        <Routes>
          <Route path='/video/:videoId' exact element={<VideoPlayer />} />
          <Route path='/' element={<AllVideosListing />} />
          <Route path='/playlist' element={<ShowPlayList />} />
          <Route path='/watch-later' element={<WatchLater />} />
          <Route path='/library' element={<Library />} />
          <Route path='/history' element={<History />} />
          <Route path='/liked' element={<Liked />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}
