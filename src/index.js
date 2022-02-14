import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom'
import App from "./App";
import { AuthProvider } from './Context/AuthProvider'
import { VideoProvider } from './Context/VideoContext'
const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <AuthProvider>
      <VideoProvider>
        <Router>
          <App />
        </Router>
      </VideoProvider>
    </AuthProvider>
  </StrictMode>,
  rootElement
);
