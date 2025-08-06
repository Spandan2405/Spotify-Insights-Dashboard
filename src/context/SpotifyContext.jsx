"use client";

import { createContext, useState, useEffect } from "react";
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
  const isDemoMode = localStorage.getItem("spotify_demo_mode") === "true";
  // console.log(accessToken);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!isDemoMode && !accessToken) {
          setError("Please log in to access Spotify data.");
          setLoading(false);
          return;
        }

        // Fetch all data in parallel for better performance
        const [
          userProfile,
          userPlaylists,
          userArtists,
          userTracks,
          userFollowing,
          userRecents,
        ] = await Promise.all([
          getUserProfile(),
          getUserPlaylists(),
          getTopArtists(timeRange),
          getTopTracks(timeRange),
          getFollowings(),
          getRecentlyPlayed(),
        ]);

        // Check for errors in any of the responses
        if (!userProfile.success) throw new Error(userProfile.error);
        if (!userPlaylists.success) throw new Error(userPlaylists.error);
        if (!userArtists.success) throw new Error(userArtists.error);
        if (!userTracks.success) throw new Error(userTracks.error);
        if (!userFollowing.success) throw new Error(userFollowing.error);
        if (!userRecents.success) throw new Error(userRecents.error);

        // Set all data
        setProfile(userProfile.data);
        setPlaylists(userPlaylists.data); // Adjust for demo mode structure
        setArtists(userArtists.data);
        setTracks(userTracks.data);
        setFollowing(userFollowing.data);
        setRecents(userRecents.data);
      } catch (err) {
        console.error("Error fetching Spotify data:", err);
        setError(
          err.message ||
            "Failed to fetch Spotify data. Please check your connection and try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRange, isDemoMode]);

  // Function to refresh data
  // const refreshData = () => {
  //   setLoading(true);
  //   setError(null);
  //   // This will trigger the useEffect to run again
  //   setTimeRange((prev) => prev);
  // };

  console.log(profile);
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
    // refreshData,
  };

  return (
    <SpotifyContext.Provider value={value}>{children}</SpotifyContext.Provider>
  );
};
