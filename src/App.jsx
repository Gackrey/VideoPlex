import "./styles.css";
import { Routes, Route } from 'react-router-dom'
import { AllVideosListing } from './pages/AllVideos'
import  ShowPlayList  from './pages/ShowPlaylist'
import Liked from './pages/Liked'
import { NotFound } from './pages/NotFound'
import Login from './pages/Login';
import SignUp from './pages/SignUp'
import WatchLater from './pages/WatchLater'
import VideoPlayer from './pages/VideoPlayer'
import Navbar from './Components/Navbar'
import SideBar from './Components/SideBar'
import Library from './pages/Library'
import History from './pages/History'
import UserDetails from './pages/userDetails'
import {PrivateRoute} from './PrivateRoute'
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
    const theme = localStorage?.getItem('theme')
    if(theme){
      document.documentElement.setAttribute('data-theme', theme)
    }
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
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/userdetails' element={<UserDetails />} />
          <PrivateRoute path='/playlist' element={<ShowPlayList />} />
          <PrivateRoute path='/watch-later' element={<WatchLater />} />
          <PrivateRoute path='/library' element={<Library />} />
          <PrivateRoute path='/history' element={<History />} />
          <PrivateRoute path='/liked' element={<Liked />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}
