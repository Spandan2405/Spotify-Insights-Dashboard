import React, { useContext } from "react";
import Timeconverter from "../utils/Timeconverter";
import { SpotifyContext } from "../context/SpotifyContext";
import { Link } from "react-router-dom";
import ErrorHandler from "../utils/ErrorHandler";

//Grid view and list view
function Recents() {
  const { recents, loading, error } = useContext(SpotifyContext);
  // console.log(recents);

  if (loading || error) {
    return <ErrorHandler loading={loading} error={error} />;
  }

  return (
    <main>
      {recents && (
        <div className="h-full xl:px-40 xl:py-20 md:p-20 px-6 py-12">
          <div className="w-full">
            <h1 className="text-xl md:text-2xl text-white font-bold text-center md:text-left">
              Recently Played Tracks
            </h1>
          </div>
          <div>
            <ul className="w-full flex flex-col md:flex-col gap-4 md:gap-6 md:py-8 my-8">
              {recents.items?.length === 0 && (
                <h1 className="text-lg text-gray-400 font-semibold">
                  No Recent Tracks were found
                </h1>
              )}
              {recents.items?.map((song, i) => (
                <li key={i}>
                  <Link to={`/track/${song.track.id}`}>
                    <div className="w-full flex gap-4 items-center justify-center group cursor-pointer">
                      {song.track.album?.images[0] && (
                        <div className="w-15 h-15 content-center group-hover:opacity-50 transition ease-in-out duration-400">
                          <img
                            src={song.track.album.images[0].url}
                            alt={song.track.name}
                          />
                        </div>
                      )}
                      <div className="w-full h-full flex justify-between md:items-center">
                        <div className="flex flex-col text-left">
                          <div className="text-white text-base md:text-lg font-medium line-clamp-1 ">
                            <span className="hover:border-b-1">
                              {song.track.name}
                            </span>
                          </div>
                          <p className="text-xs md:text-sm text-zinc-400 line-clamp-1">
                            {song.track.album?.artists[0].name} -{" "}
                            {song.track.album?.name}
                          </p>
                        </div>
                        <div className="text-gray-400 text-sm text-right">
                          {Timeconverter(song.track.duration_ms)}
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}

export default Recents;
