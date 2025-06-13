import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getTrackDetails,
  //   getTrackAudioFeatures,
  //   getRecommendations,
} from "../utils/spotify";
import ErrorHandler from "../utils/ErrorHandler";
import Timeconverter from "../utils/Timeconverter";

const TrackDetail = () => {
  const { id } = useParams(); // Get track ID from URL
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrackData = async () => {
      setLoading(true);
      try {
        const trackRes = await getTrackDetails(id);
        if (trackRes.success) setTrack(trackRes.data);
        if (!trackRes.success) {
          setError("Failed to load some track data.");
        }
      } catch (err) {
        setError("Failed to fetch track data.", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrackData();
  }, [id]);

  if (loading || error) {
    return <ErrorHandler loading={loading} error={error} />;
  }

  //   console.log(track);
  return (
    <div className="w-full flex min-h-screen bg-zinc-900 text-white items-center justify-center md:py-6">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-evenly">
        <img
          src={
            track.album.images?.[0]?.url || "https://via.placeholder.com/300"
          }
          alt={track.name}
          className="w-52 h-52 md:w-64 md:h-64 xl:w-72 xl:h-72 rounded-xl object-cover justify-center items-center"
        />
        <div className="flex flex-col gap-2 my-5">
          <h1 className="text-2xl md:text-4xl font-bold text-center">
            {track.name}
          </h1>
          <p className="text-white text-lg md:text-xl text-center font-semibold mb-4">
            By{" "}
            {track.artists
              .map((artist) => (
                <Link
                  key={artist.id}
                  to={`/artist/${artist.id}`}
                  className="hover:border-b-1 hover:text-gray-400 "
                >
                  {artist.name}
                </Link>
              ))
              .reduce((prev, curr) => [prev, ", ", curr])}
          </p>
          <p className="text-gray-400 text-base md:text-lg font-mono font-bold ">
            Album: {track.album.name}
          </p>
          <p className="text-gray-400 text-base md:text-lg font-mono font-bold ">
            Duration: {Timeconverter(track.duration_ms)}
          </p>
          <p className="text-gray-400 text-base md:text-lg font-mono font-bold ">
            Popularity: {track.popularity}/100
          </p>
        </div>
        <div>
          <button className="px-4 py-2 md:px-8 md:py-3 font-bold border-2 border-white bg-green-500 rounded-full text-white text-sm md:text-xl hover:text-zinc-900 hover:cursor-pointer transition hover:border-black duration-200 ease-in-out tracking-wide mt-4">
            <a
              href={track.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className=""
            >
              Open in Spotify
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackDetail;
