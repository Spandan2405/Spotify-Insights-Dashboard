import Sidebar from "../components/Sidebar";
import UserProfile from "../components/UserProfile";
import TopArtistList from "../components/TopArtistList";
import TopTrackList from "../components/TopTrackList";
import { useContext } from "react";
import { SpotifyContext } from "../context/SpotifyContext";
import ErrorHandler from "../utils/ErrorHandler";

function Profile() {
  const { profile, playlists, artists, tracks, following, loading, error } =
    useContext(SpotifyContext);
  if (loading || error) {
    return <ErrorHandler loading={loading} error={error} />;
  }
  return (
    <main>
      {profile && playlists && artists && following && (
        <div className="w-full h-full relative mb-16">
          <div className="bg-zinc-900">
            <UserProfile
              profile={profile}
              playlists={playlists}
              following={following}
            />
            <div className="w-full h-full flex flex-col md:flex-row md:gap-8 gap-6 bg-zinc-900 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 py-6 sm:py-8">
              <div className="w-full md:w-1/2 h-full">
                <TopArtistList artists={artists.items?.slice(0, 10)} />
              </div>
              <div className="w-full md:w-1/2 h-full mt-8 md:mt-0">
                <TopTrackList tracks={tracks.items?.slice(0, 10)} />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Profile;
