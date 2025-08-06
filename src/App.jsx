import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Profile from "./pages/Profile";
import Tracks from "./pages/Tracks";
import Artists from "./pages/Artists";
import Recents from "./pages/Recents";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import Playlist from "./pages/Playlist";
import ArtistDetail from "./pages/ArtistDetail";
import TrackDetail from "./pages/TrackDetail";

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-zinc-900">
      <main className={`flex-1 ${!isHome ? "md:ml-[7vw]" : ""}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/top-artists" element={<Artists />} />
          <Route path="/top-tracks" element={<Tracks />} />
          <Route path="/recent" element={<Recents />} />
          <Route path="/playlists" element={<Playlist />} />
          <Route path="/artist/:id" element={<ArtistDetail />} />
          <Route path="/track/:id" element={<TrackDetail />} />
        </Routes>
      </main>
      {!isHome && <Sidebar />}
    </div>
  );
}
