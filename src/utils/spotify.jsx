// FRONTEND-FLOW : getAccessToken -> hasTokenExpired ->

//  If not expired, return access token from localStorage -> add it to the request header -> make API calls (user,playlist);
//  If expired -> refreshToken -> trying to get new access token using refresh token ->

// if successful, update localStorage and return new access token -> add it to the request header -> make API calls (user,playlist);
// if refresh token is not available or expired, redirect to logout

import axios from "axios";

const BASE_URL = "https://spotify-backend-six.vercel.app/";

// Map for localStorage keys
const LOCALSTORAGE_KEYS = {
  accessToken: "spotify_access_token",
  refreshToken: "spotify_refresh_token",
  expireTime: "spotify_token_expire_time",
  timestamp: "spotify_token_timestamp",
};

// Map to retrieve localStorage values
const LOCALSTORAGE_VALUES = {
  accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
  refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
  expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
  timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
};

/**
 * Clear out all localStorage items and redirect to logout
 */
export const logout = () => {
  //console.log("Logging out and clearing localStorage...");
  if (window.localStorage) {
    for (const property in LOCALSTORAGE_KEYS) {
      window.localStorage.removeItem(LOCALSTORAGE_KEYS[property]);
    }
  }
  return (window.location.href = `${BASE_URL}/auth/logout`);
};

/**
 * Check if the access token has expired
 * @returns {boolean} Whether the token has expired
 */
const hasTokenExpired = () => {
  //console.log("Checking if token got expired...");
  const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUES;
  if (!accessToken || !timestamp || !expireTime) {
    return true;
  }
  const millisecondsElapsed = Date.now() - Number(timestamp);
  return millisecondsElapsed / 1000 > Number(expireTime);
};

/**
 * Refresh the access token using the refresh token
 * @returns {Promise<string>} The new access token
 */
const refreshToken = async () => {
  //console.log("Refreshing access token...");
  try {
    if (
      !LOCALSTORAGE_VALUES.refreshToken ||
      LOCALSTORAGE_VALUES.refreshToken === "undefined"
    ) {
      //console.log("No refresh token available");
      // logout();
      return null;
    }

    const response = await axios.get(
      `${BASE_URL}/auth/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`
    );
    const { access_token, expires_in } = response.data;

    window.localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, access_token);
    window.localStorage.setItem(LOCALSTORAGE_KEYS.expireTime, expires_in);
    window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());

    LOCALSTORAGE_VALUES.accessToken = access_token;
    LOCALSTORAGE_VALUES.expireTime = expires_in;
    LOCALSTORAGE_VALUES.timestamp = Date.now().toString();
    //console.log(
    //   "Access token refreshed successfully:",
    //   access_token.slice(0, 20),
    //   "..."
    // );
    return access_token;
  } catch (error) {
    console.error("Error refreshing token:", error.message);
    logout();
    return null;
  }
};

/**
 * Get the Spotify access token from localStorage or URL query params
 * @returns {string} The access token or false if not available
 */
const getAccessToken = () => {
  //console.log("--------------------------------------------------");
  //console.log("Getting access tokens through localStorage or URL params...");
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const queryParams = {
    [LOCALSTORAGE_KEYS.accessToken]: urlParams.get("access_token"),
    [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get("refresh_token"),
    [LOCALSTORAGE_KEYS.expireTime]: urlParams.get("expires_in"),
  };
  const hasError = urlParams.get("error");

  if (hasError || hasTokenExpired()) {
    refreshToken();
  }

  // Check localStorage first
  let token = window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken);
  if (token && token !== "undefined") {
    //console.log("Access token already exists in LocalStorage");
    LOCALSTORAGE_VALUES.accessToken = token;
    return token;
  }

  if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
    //console.log("Access token found in URL");
    for (const property in queryParams) {
      if (queryParams[property]) {
        window.localStorage.setItem(property, queryParams[property]);
        LOCALSTORAGE_VALUES[property] = queryParams[property];
      }
    }
    window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
    LOCALSTORAGE_VALUES.timestamp = Date.now().toString();
    window.history.replaceState({}, document.title, "/"); // Clear URL params
    return queryParams[LOCALSTORAGE_KEYS.accessToken];
  }
  return false;
};

export const accessToken = getAccessToken();

// Configure Axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor to include access token and handle token refresh
apiClient.interceptors.request.use(
  (config) => {
    //console.log("Adding access token to request headers...");
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshToken();
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

// Fetch user profile
export async function getUserProfile() {
  try {
    const response = await apiClient.get("/user/profile");
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    return {
      success: false,
      error:
        error.response?.status === 401
          ? "Authentication required. Please log in via Spotify."
          : "Failed to fetch profile",
    };
  }
}

// Fetch user playlists
export async function getUserPlaylists() {
  try {
    const response = await apiClient.get("/user/playlists");
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching playlists:", error.message);
    return {
      success: false,
      error:
        error.response?.status === 401
          ? "Authentication required. Please log in via Spotify."
          : "Failed to fetch playlists",
    };
  }
}

// Fetch user top tracks
export async function getTopTracks({ timeRange = "long_term" }) {
  try {
    const response = await apiClient.get(
      `/user/top-tracks?time_range=${timeRange}`
    );
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching top tracks:", error.message);
    return {
      success: false,
      error:
        error.response?.status === 401
          ? "Authentication required. Please log in via Spotify."
          : "Failed to fetch top tracks",
    };
  }
}

// Fetch recently played tracks
export async function getRecentlyPlayed() {
  try {
    const response = await apiClient.get("/user/recently-played");
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching recently played tracks:", error.message);
    return {
      success: false,
      error:
        error.response?.status === 401
          ? "Authentication required. Please log in via Spotify."
          : "Failed to fetch recently played tracks",
    };
  }
}

// Fetch top artists
export async function getTopArtists({ timeRange = "long_term" }) {
  try {
    const response = await apiClient.get(
      `/user/top-artists?time_range=${timeRange}`
    );
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching top artists:", error.message);
    return {
      success: false,
      error:
        error.response?.status === 401
          ? "Authentication required. Please log in via Spotify."
          : "Failed to fetch top artists",
    };
  }
}

// Fetch following artists
export async function getFollowings() {
  try {
    const response = await apiClient.get("/user/following");
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching following artists:", error.message);
    return {
      success: false,
      error:
        error.response?.status === 401
          ? "Authentication required. Please log in via Spotify."
          : "Failed to fetch following artists",
    };
  }
}

// Fetch artist details
export async function getArtistDetails(artistId) {
  try {
    const response = await apiClient.get(`/artist/${artistId}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching artist details:", error.message);
    return {
      success: false,
      error: "Failed to fetch artist details",
    };
  }
}

// Fetch artist top tracks
export async function getArtistTopTracks(artistId) {
  try {
    const response = await apiClient.get(`/artist/${artistId}/top-tracks`);
    return { success: true, data: response.data.tracks };
  } catch (error) {
    console.error("Error fetching artist top tracks:", error.message);
    return {
      success: false,
      error: "Failed to fetch artist top tracks",
    };
  }
}

// Fetch related artists
export async function getRelatedArtists(artistId) {
  try {
    const response = await apiClient.get(`/artist/${artistId}/related-artists`);
    return { success: true, data: response.data.artists };
  } catch (error) {
    console.error("Error fetching related artists:", error.message);
    return {
      success: false,
      error: "Failed to fetch related artists",
    };
  }
}

// Fetch track details
export async function getTrackDetails(trackId) {
  try {
    const response = await apiClient.get(`/track/${trackId}`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching track details:", error.message);
    return {
      success: false,
      error: "Failed to fetch track details",
    };
  }
}

// Fetch track audio features
export async function getTrackAudioFeatures(trackId) {
  try {
    const response = await apiClient.get(`/track/${trackId}/audio-features`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching track audio features:", error.message);
    return {
      success: false,
      error: "Failed to fetch track audio features",
    };
  }
}

// Fetch recommendations based on track
export async function getRecommendations(seedTrackId) {
  try {
    const response = await apiClient.get(
      `/recommendations?seed_tracks=${seedTrackId}`
    );
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching recommendations:", error.message);
    return {
      success: false,
      error: "Failed to fetch recommendations",
    };
  }
}
