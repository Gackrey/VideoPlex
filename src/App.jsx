import "./styles.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import SideBar from "./Components/SideBar";
import { PrivateRoute } from "./PrivateRoute";
import { config } from "./config";
import axios from "axios";
import { useVideoContext } from "./Context/VideoContext";
import { useEffect } from "react";
import {
  AllVideosListing,
  Search,
  VideoPlayer,
  Login,
  SignUp,
  UserDetails,
  ShowPlayList,
  WatchLater,
  Liked,
  Library,
  History,
  NotFound,
} from "./pages/index";

export default function App() {
  const { AllVideos, dispatch } = useVideoContext();
  async function getDataFromAPI() {
    try {
      const response = await axios.get(
        "https://videoplex-backend.herokuapp.com/video/all-video"
      );
      dispatch({ type: "INITIALIZE_VIDEOS", payload: response.data });
    } catch (error) {
      console.error("Error", error);
    }
  }

  useEffect(() => {
    const theme = localStorage?.getItem("theme");
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
    }
    AllVideos.length === 0 && getDataFromAPI();
  }, []);

  useEffect(() => {
    let localUser = localStorage?.getItem("VideoAuthDetails");
    if (localUser) {
      (async function () {
        try {
          localUser = JSON.parse(localUser);
          const token = localUser.id;
          const response = await axios.get(
            `https://videoplex-backend.herokuapp.com/user/userDetails`,
            {
              headers: { authorization: token },
            }
          );
          dispatch({
            type: "SET_DATA_FROM_SERVER",
            payload: response.data.user,
          });
        } catch (error) {
          console.error("Error", error);
        }
      })();
    }
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div className="mainPreview">
        <SideBar />
        <Routes>
          <Route path="/" element={<AllVideosListing />} />
          <Route path="/search" element={<Search />} />
          <Route path="/video/:videoId" exact element={<VideoPlayer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/userdetails" element={<UserDetails />} />
          <PrivateRoute path="/playlist" element={<ShowPlayList />} />
          <PrivateRoute path="/watch-later" element={<WatchLater />} />
          <PrivateRoute path="/library" element={<Library />} />
          <PrivateRoute path="/history" element={<History />} />
          <PrivateRoute path="/liked" element={<Liked />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}
