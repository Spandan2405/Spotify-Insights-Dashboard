import React, { useContext, useState, useEffect } from "react";
import Card from "../components/Card";
import { SpotifyContext } from "../context/SpotifyContext";
import ErrorHandler from "../utils/ErrorHandler";
import { Link } from "react-router-dom";

function Playlist() {
  const { profile, playlists, loading, error } = useContext(SpotifyContext);
  const [typePlaylist, setTypePlaylist] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const handleFilterPlaylist = (filterValue) => {
      if (!playlists?.items) {
        setTypePlaylist([]);
        return;
      }

      let filtered = [...playlists.items];

      if (filterValue === "Owned") {
        filtered = filtered.filter(
          (playlist) => playlist.owner.display_name === profile.display_name
        );
      } else if (filterValue === "Colab") {
        filtered = filtered.filter((playlist) => playlist.collaborative);
      }

      setTypePlaylist(filtered);
    };

    handleFilterPlaylist(filter);
  }, [filter, playlists]);

  if (loading || error) {
    return <ErrorHandler loading={loading} error={error} />;
  }

  return (
    <main>
      {playlists?.items ? (
        <div className="h-full xl:px-40 xl:py-20 md:p-20 px-6 py-12 pb-30">
          <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
            <h1 className="text-white font-bold text-xl sm:text-2xl">
              Your Playlists
            </h1>
            <div className="flex gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm md:text-base text-gray-400 font-semibold mt-3 sm:mt-0 justify-evenly">
              <div
                className={`${
                  filter === "All" ? "border-b-2 border-white text-white" : ""
                } hover:text-white cursor-pointer text-center sm:text-left`}
                onClick={() => setFilter("All")}
              >
                All
              </div>
              <div
                className={`${
                  filter === "Owned" ? "border-b-2 border-white text-white" : ""
                } hover:text-white cursor-pointer text-center sm:text-left`}
                onClick={() => setFilter("Owned")}
              >
                Owned
              </div>
              <div
                className={`${
                  filter === "Colab" ? "border-b-2 border-white text-white" : ""
                } hover:text-white cursor-pointer text-center sm:text-left`}
                onClick={() => setFilter("Colab")}
              >
                Collaborated
              </div>
            </div>
          </div>
          <div className="w-full h-full mt-6 sm:mt-8 md:mt-12">
            {typePlaylist.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 md:gap-8">
                {typePlaylist.map((playlist, i) => (
                  <Link
                    key={playlist.id}
                    to={playlist.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="w-32 h-40 sm:w-36 sm:h-44 md:w-44 md:h-52 lg:w-48 lg:h-56 rounded-xl hover:bg-zinc-800">
                      <Card
                        img={playlist.images?.[0]?.url}
                        name={playlist.name}
                        owner={playlist.owner.display_name}
                        key={i}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center text-sm sm:text-base p-4 sm:p-6">
                No playlists found for this filter.
              </p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-gray-400 text-center text-sm sm:text-base p-4 sm:p-6">
          No playlists available.
        </p>
      )}
    </main>
  );
}

export default Playlist;
