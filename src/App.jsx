import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Tracks from "./pages/Tracks";
import Artists from "./pages/Artists";
import Recents from "./pages/Recents";
import Sidebar from "./components/Sidebar";
import { SpotifyContext, SpotifyProvider } from "./context/SpotifyContext";
import Playlist from "./pages/Playlist";
import Loader from "./components/Loader";
import ArtistDetail from "./pages/ArtistDetail";
import TrackDetail from "./pages/TrackDetail";

export default function App() {
  return (
    <>
      <SpotifyProvider>
        <Router>
          <div className="flex flex-col md:flex-row min-h-screen bg-zinc-900">
            {/* Main content area */}
            <main className="flex-1 md:ml-[7vw]">
              <Routes>
                <Route path="/" element={<Profile />} />
                <Route path="/top-artists" element={<Artists />} />
                <Route path="/top-tracks" element={<Tracks />} />
                <Route path="/recent" element={<Recents />} />
                <Route path="/playlists" element={<Playlist />} />
                <Route path="/artist/:id" element={<ArtistDetail />} />
                <Route path="/track/:id" element={<TrackDetail />} />
              </Routes>
            </main>
            {/* Sidebar */}
            <Sidebar />
          </div>
        </Router>
      </SpotifyProvider>
    </>
  );
}
