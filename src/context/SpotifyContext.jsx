import React, { createContext, useState, useEffect } from "react";
import {
  getUserProfile,
  getUserPlaylists,
  getTopArtists,
  getTopTracks,
  getFollowings,
  getRecentlyPlayed,
  accessToken,
} from "../utils/spotify";

// Create the context
export const SpotifyContext = createContext();

// Create the provider component
export const SpotifyProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [following, setFollowing] = useState([]);
  const [recents, setRecents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState("long_term"); // Default time range

  useEffect(() => {
    const fetchData = async () => {
      if (!accessToken) {
        setError("Please log in to access Spotify data.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        if (!accessToken) {
          setError("Please log in to access Spotify data.");
          setLoading(false);
          return;
        }
        const userProfile = await getUserProfile();
        if (!userProfile.success) throw new Error(userProfile.error);
        setProfile(userProfile.data);

        const userPlaylists = await getUserPlaylists();
        if (!userPlaylists.success) throw new Error(userPlaylists.error);
        setPlaylists(userPlaylists.data);

        const userArtists = await getTopArtists(timeRange);
        if (!userArtists.success) throw new Error(userArtists.error);
        setArtists(userArtists.data);

        const userTracks = await getTopTracks(timeRange);
        if (!userTracks.success) throw new Error(userTracks.error);
        setTracks(userTracks.data);

        const userFollowing = await getFollowings();
        if (!userFollowing.success) throw new Error(userFollowing.error);
        setFollowing(userFollowing.data);

        const userRecents = await getRecentlyPlayed();
        if (!userRecents.success) throw new Error(userRecents.error);
        setRecents(userRecents.data);
      } catch (err) {
        setError(
          err.message ?? "Failed to fetch data. Please try logging in again."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [accessToken]);

  // The value provided to all consumers of the context
  const value = {
    profile,
    playlists,
    artists,
    tracks,
    following,
    recents,
    loading,
    error,
    timeRange,
    setTimeRange,
    setLoading,
    setError,
  };

  return (
    <SpotifyContext.Provider value={value}>{children}</SpotifyContext.Provider>
  );
};
