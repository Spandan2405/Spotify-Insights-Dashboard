import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getArtistDetails, getArtistTopTracks } from "../utils/spotify";
import ErrorHandler from "../utils/ErrorHandler";

const ArtistDetail = () => {
  const { id } = useParams(); // Get artist ID from URL
  const [artist, setArtist] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtistData = async () => {
      setLoading(true);
      try {
        const artistRes = await getArtistDetails(id);
        const topTracksRes = await getArtistTopTracks(id);

        if (artistRes.success) setArtist(artistRes.data);
        if (topTracksRes.success) setTopTracks(topTracksRes.data);

        if (!artistRes.success || !topTracksRes.success) {
          setError("Failed to load some artist data.");
        }
      } catch (err) {
        setError("Failed to fetch artist data.", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtistData();
  }, [id]);

  if (loading || error) {
    return <ErrorHandler loading={loading} error={error} />;
  }
  console.log(topTracks.tracks);

  return (
    <div className="w-full flex flex-col md:flex-row min-h-screen items-center justify-center py-12 px-6 bg-zinc-900 text-white gap-8">
      {/* Hero Section */}
      <div className="flex flex-col items-center gap-6 md:gap-8 md:w-3/5">
        <img
          src={artist.images?.[0]?.url || "https://via.placeholder.com/300"}
          alt={artist.name}
          className="w-52 h-52 md:w-64 md:h-64 rounded-full object-cover"
        />
        <div className="flex flex-col space-y-2 items-center">
          <h1 className="text-2xl md:text-4xl font-bold">{artist.name}</h1>
          <div className="flex flex-wrap gap-2 md:gap-8 mt-4 ">
            <div
              className={`flex flex-row-reverse md:flex-col gap-4 md:gap-0 md:space-y-2 items-center justify-center ${
                artist.genres.length ? "" : "hidden"
              }`}
            >
              <p className="text-lg md:text-xl text-blue-500 font-bold line-clamp-2">
                {artist.genres
                  .slice(0, 4)
                  ?.map(
                    (genre) => genre.slice(0, 1).toUpperCase() + genre.slice(1)
                  )
                  .join(", ")}
              </p>
              <p className="text-lg md:text-base text-gray-500 font-semibold font-mono">
                GENRES
              </p>
            </div>
            <div className="flex flex-row-reverse md:flex-col gap-4 md:gap-0 md:space-y-2 items-center justify-center">
              <p className="text-lg md:text-xl text-blue-500 font-bold ">
                {artist.followers.total.toLocaleString()}
              </p>
              <p className="text-lg md:text-base text-gray-500 font-semibold font-mono">
                FOLLOWERS
              </p>
            </div>
            <div className="flex flex-row-reverse md:flex-col gap-4 md:gap-0 md:space-y-2 items-center justify-center">
              <p className="text-lg md:text-xl text-blue-500 font-bold ">
                {artist.popularity}/100
              </p>
              <p className="text-lg md:text-base text-gray-500 font-semibold font-mono">
                POPULARITY
              </p>
            </div>
          </div>
        </div>
        <button className="px-4 py-2  md:px-8 md:py-3 font-bold border-2 border-white bg-green-500 rounded-full text-white text-sm md:text-xl hover:text-zinc-900 hover:cursor-pointer transition hover:border-black duration-200 ease-in-out tracking-wide mb-4">
          <a
            href={artist.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className=""
          >
            Open in Spotify
          </a>
        </button>
      </div>

      {/* Top Tracks Section */}
      <div className="md:w-2/5 w-full mb-20 md:mb-0">
        <h2 className="text-2xl font-bold mb-8">Artist's Top Tracks</h2>
        <ul className="space-y-4">
          {topTracks.tracks.slice(0, 5).map((track) => (
            <li
              key={track.id}
              className="flex items-center gap-4 group cursor-pointer"
            >
              <img
                src={
                  track.album.images?.[0]?.url ||
                  "https://via.placeholder.com/64"
                }
                alt={track.name}
                className="w-16 h-16 rounded group-hover:brightness-50"
              />
              <div className="w-full h-full flex">
                <Link to={`/track/${track.id}`}>
                  <div className="flex flex-col text-left">
                    <div className="text-white text-base md:text-lg font-medium line-clamp-1 tracking-wide">
                      <span className="hover:border-b-1">{track.name}</span>
                    </div>
                    <p className="text-xs md:text-sm text-zinc-400 line-clamp-1 mt-0.5">
                      {track.album.name}
                    </p>
                  </div>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArtistDetail;
