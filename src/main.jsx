import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { SpotifyProvider } from "./context/SpotifyContext";
import { BrowserRouter as Router } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <SpotifyProvider>
      <Router>
        <App />
      </Router>
    </SpotifyProvider>
    <Analytics />
  </>
);
