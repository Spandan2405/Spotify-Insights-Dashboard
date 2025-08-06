import React, { useContext } from "react";
import { SpotifyContext } from "../context/SpotifyContext";
import Timeconverter from "../utils/Timeconverter";
import { Link } from "react-router-dom";
import ErrorHandler from "../utils/ErrorHandler";
import { useState } from "react";
import { useEffect } from "react";
import { getTopTracks } from "../utils/spotify";
import TimeRange from "../components/TimeRange";

function Tracks() {
  const { loading, error, timeRange, setTimeRange, setLoading, setError } =
    useContext(SpotifyContext);
  const [toptracks, setToptracks] = useState([]);
  const DEMO_MODE = localStorage.setItem("spotify_demo_mode", "true");

  useEffect(() => {
    try {
      setLoading(true);
      const fetchArtists = async (timeRange) => {
        const userTracks = await getTopTracks(
          DEMO_MODE ? timeRange : { timeRange }
        );
        if (!userTracks.success) throw new Error(userTracks.error);
        setToptracks(userTracks.data);
      };
      fetchArtists(timeRange);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching Tracks:", err);
    } finally {
      setLoading(false);
    }
  }, [timeRange, setLoading, setError]);

  if (loading || error) {
    return <ErrorHandler loading={loading} error={error} />;
  }

  // console.log(toptracks);
  return (
    <main>
      {toptracks && (
        <div className="h-full xl:px-40 xl:py-20 md:p-20 px-6 py-12">
          <div className="w-full justify-between flex flex-col md:flex-row">
            <h1 className="text-xl md:text-2xl text-white font-bold text-center">
              Top Tracks
            </h1>
            <div>
              <TimeRange activeRange={timeRange} setTimeRange={setTimeRange} />
            </div>
          </div>
          <div>
            <ul className="w-full flex flex-col md:flex-col gap-4 md:gap-6 md:py-8 my-8">
              {toptracks.items?.length === 0 && (
                <h1 className="text-lg text-gray-400 font-semibold">
                  No Tracks were found
                </h1>
              )}
              {toptracks?.items?.map((track, i) => (
                <li key={i}>
                  <Link to={`/track/${track.id}`}>
                    <div className="w-full flex gap-4 items-center justify-center group cursor-pointer">
                      {track.album.images[0] && (
                        <div className="w-15 h-15 content-center group-hover:opacity-50 transition ease-in-out duration-400">
                          <img
                            src={track.album.images[0].url}
                            alt={track.name}
                          />
                        </div>
                      )}
                      <div className="w-full h-full flex justify-between md:items-center">
                        <div className="flex flex-col text-left">
                          <div className="text-white text-base md:text-lg font-medium line-clamp-1 ">
                            <span className="hover:border-b-1">
                              {track.name}
                            </span>
                          </div>
                          <p className="text-xs md:text-sm text-zinc-400 line-clamp-1">
                            {track.album.artists[0].name} - {track.album.name}
                          </p>
                        </div>
                        <div className="text-gray-400 text-sm text-right">
                          {Timeconverter(track.duration_ms)}
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

export default Tracks;
