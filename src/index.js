import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom'
import App from "./App";
import { VideoProvider } from './Context/VideoContext'
const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <VideoProvider>
      <Router>
        <App />
      </Router>
    </VideoProvider>
  </StrictMode>,
  rootElement
);
