import axios from "axios";

// Your hardcoded Spotify credentials - Replace these with your actual values
const SPOTIFY_CONFIG = {
  CLIENT_ID: "c02e56d361684be68b978c01b71e6dc3",
  CLIENT_SECRET: "6ab6e4d1264647e38d444c7a14e99571",
  REFRESH_TOKEN:
    "AQCRkqoIDPIExFYVvRHQMBM1kcTz4YDKgWYb_xIszUVHnmu7Ygm6rxxZQ3gg-bflA01M9euTwK_jzSXIoS8_oRrSf1THOwrnh9vbkRdWmTBXjB7oBqS5HR-cBaD2Qcwn64U", // You'll need to get this once
};

// Spotify API base URL
const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

// Store access token in memory
let accessToken = null;
let tokenExpiry = null;

/**
 * Get access token using client credentials or refresh token
 */
const getAccessToken = async () => {
  // Check if current token is still valid
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken;
  }

  try {
    // If you have a refresh token, use it
    if (SPOTIFY_CONFIG.REFRESH_TOKEN) {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: SPOTIFY_CONFIG.REFRESH_TOKEN,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${btoa(
              `${SPOTIFY_CONFIG.CLIENT_ID}:${SPOTIFY_CONFIG.CLIENT_SECRET}`
            )}`,
          },
        }
      );

      accessToken = response.data.access_token;
      tokenExpiry = Date.now() + response.data.expires_in * 1000;
      return accessToken;
    } else {
      // Use client credentials flow (limited access)
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        new URLSearchParams({
          grant_type: "client_credentials",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${btoa(
              `${SPOTIFY_CONFIG.CLIENT_ID}:${SPOTIFY_CONFIG.CLIENT_SECRET}`
            )}`,
          },
        }
      );

      accessToken = response.data.access_token;
      tokenExpiry = Date.now() + response.data.expires_in * 1000;
      return accessToken;
    }
  } catch (error) {
    console.error("Error getting access token:", error);
    throw new Error("Failed to authenticate with Spotify");
  }
};

/**
 * Make authenticated request to Spotify API
 */
const spotifyRequest = async (endpoint) => {
  try {
    const token = await getAccessToken();
    const response = await axios.get(`${SPOTIFY_API_BASE}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return {
      success: false,
      error:
        error.response?.data?.error?.message ||
        error.message ||
        "Failed to fetch data",
    };
  }
};

// API Functions
export async function getUserProfile() {
  return await spotifyRequest("/me");
}

export async function getUserPlaylists() {
  return await spotifyRequest("/me/playlists?limit=50");
}

export async function getTopTracks(timeRange = "long_term") {
  return await spotifyRequest(
    `/me/top/tracks?time_range=${timeRange}&limit=50`
  );
}

export async function getTopArtists(timeRange = "long_term") {
  return await spotifyRequest(
    `/me/top/artists?time_range=${timeRange}&limit=50`
  );
}

export async function getRecentlyPlayed() {
  return await spotifyRequest("/me/player/recently-played?limit=50");
}

export async function getFollowings() {
  return await spotifyRequest("/me/following?type=artist&limit=50");
}

export async function getArtistDetails(artistId) {
  return await spotifyRequest(`/artists/${artistId}`);
}

export async function getArtistTopTracks(artistId) {
  const result = await spotifyRequest(
    `/artists/${artistId}/top-tracks?market=US`
  );
  return result.success ? { success: true, data: result.data.tracks } : result;
}

export async function getRelatedArtists(artistId) {
  const result = await spotifyRequest(`/artists/${artistId}/related-artists`);
  return result.success ? { success: true, data: result.data.artists } : result;
}

export async function getTrackDetails(trackId) {
  return await spotifyRequest(`/tracks/${trackId}`);
}
