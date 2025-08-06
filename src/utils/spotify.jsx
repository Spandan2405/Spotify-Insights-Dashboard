import axios from "axios";

// Configuration
const BASE_URL = "https://spotify-dashboard-backend-yn6x.onrender.com"; // Backend URL for real mode
const SPOTIFY_API_BASE = "https://api.spotify.com/v1"; // Spotify API for demo mode
const DEMO_MODE = localStorage.getItem("spotify_demo_mode") === "true"; // Set to true for demo mode, false for real mode
let tokenExpiry = null;

// Hardcoded Spotify credentials for demo mode - Replace with your actual values
const SPOTIFY_CONFIG = {
  CLIENT_ID: "c02e56d361684be68b978c01b71e6dc3",
  CLIENT_SECRET: "6ab6e4d1264647e38d444c7a14e99571",
  REFRESH_TOKEN:
    "AQCRkqoIDPIExFYVvRHQMBM1kcTz4YDKgWYb_xIszUVHnmu7Ygm6rxxZQ3gg-bflA01M9euTwK_jzSXIoS8_oRrSf1THOwrnh9vbkRdWmTBXjB7oBqS5HR-cBaD2Qcwn64U",
};

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
  window.localStorage.removeItem("spotify_demo_mode");
  if (window.localStorage) {
    for (const property in LOCALSTORAGE_KEYS) {
      window.localStorage.removeItem(LOCALSTORAGE_KEYS[property]);
    }
  }

  return (window.location.href = `/`);
};

/**
 * Check if the access token has expired
 * @returns {boolean} Whether the token has expired
 */
const hasTokenExpired = () => {
  const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUES;
  if (!accessToken || !timestamp || !expireTime) {
    return true;
  }
  const millisecondsElapsed = Date.now() - Number(timestamp);
  return millisecondsElapsed / 1000 > Number(expireTime);
};

/**
 * Refresh the access token using the refresh token (real mode only)
 * @returns {Promise<string|null>} The new access token or null if failed
 */
const refreshToken = async () => {
  if (DEMO_MODE) return null; // Skip refresh in demo mode

  try {
    if (
      !LOCALSTORAGE_VALUES.refreshToken ||
      LOCALSTORAGE_VALUES.refreshToken === "undefined"
    ) {
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
    return access_token;
  } catch (error) {
    console.error("Error refreshing token:", error.message);
    logout();
    return null;
  }
};

/**
 * Get the Spotify access token from localStorage or URL query params (real mode only)
 * @returns {string|null} The access token or null if not available
 */
const getAccessToken = () => {
  if (DEMO_MODE) return null; // No token needed in demo mode

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

  let token = window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken);
  if (token && token !== "undefined") {
    LOCALSTORAGE_VALUES.accessToken = token;
    return token;
  }

  if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
    for (const property in queryParams) {
      if (queryParams[property]) {
        window.localStorage.setItem(property, queryParams[property]);
        LOCALSTORAGE_VALUES[property] = queryParams[property];
      }
    }
    window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
    LOCALSTORAGE_VALUES.timestamp = Date.now().toString();
    window.history.replaceState({}, document.title, "/");
    return queryParams[LOCALSTORAGE_KEYS.accessToken];
  }
  return null;
};

export let accessToken = getAccessToken();

// Configure Axios instance
const apiClient = axios.create({
  baseURL: DEMO_MODE ? SPOTIFY_API_BASE : BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor to include access token and handle token refresh
apiClient.interceptors.request.use(
  async (config) => {
    if (!DEMO_MODE) {
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } else {
      const token = await getDemoAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      !DEMO_MODE &&
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
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

/**
 * Get access token for demo mode using client credentials or refresh token
 * @returns {Promise<string>} The access token
 */
const getDemoAccessToken = async () => {
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken;
  }

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: SPOTIFY_CONFIG.REFRESH_TOKEN
          ? "refresh_token"
          : "client_credentials",
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
  } catch (error) {
    console.error("Error getting demo access token:", error);
    throw new Error("Failed to authenticate with Spotify for demo mode");
  }
};

// API Functions
export async function getUserProfile() {
  try {
    const endpoint = DEMO_MODE ? "/me" : "/user/profile";
    const response = await apiClient.get(endpoint);
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

export async function getUserPlaylists() {
  try {
    const endpoint = DEMO_MODE ? "/me/playlists?limit=50" : "/user/playlists";
    const response = await apiClient.get(endpoint);
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

export async function getTopTracks({ timeRange = "long_term" }) {
  try {
    const endpoint = DEMO_MODE
      ? `/me/top/tracks?time_range=${timeRange}&limit=50`
      : `/user/top-tracks?time_range=${timeRange}`;
    const response = await apiClient.get(endpoint);
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

export async function getTopArtists({ timeRange = "long_term" }) {
  try {
    const endpoint = DEMO_MODE
      ? `/me/top/artists?time_range=${timeRange}&limit=50`
      : `/user/top-artists?time_range=${timeRange}`;
    const response = await apiClient.get(endpoint);
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

export async function getRecentlyPlayed() {
  try {
    const endpoint = DEMO_MODE
      ? "/me/player/recently-played?limit=50"
      : "/user/recently-played";
    const response = await apiClient.get(endpoint);
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

export async function getFollowings() {
  try {
    const endpoint = DEMO_MODE
      ? "/me/following?type=artist&limit=50"
      : "/user/following";
    const response = await apiClient.get(endpoint);
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

export async function getArtistDetails(artistId) {
  try {
    const endpoint = DEMO_MODE ? `/artists/${artistId}` : `/artist/${artistId}`;
    const response = await apiClient.get(endpoint);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching artist details:", error.message);
    return {
      success: false,
      error: "Failed to fetch artist details",
    };
  }
}

export async function getArtistTopTracks(artistId) {
  try {
    const endpoint = DEMO_MODE
      ? `/artists/${artistId}/top-tracks`
      : `/artist/${artistId}/top-tracks`;
    const response = await apiClient.get(endpoint);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching artist top tracks:", error.message);
    return {
      success: false,
      error: "Failed to fetch artist top tracks",
    };
  }
}

export async function getRelatedArtists(artistId) {
  try {
    const endpoint = DEMO_MODE
      ? `/artists/${artistId}/related-artists`
      : `/artist/${artistId}/related-artists`;
    const response = await apiClient.get(endpoint);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching related artists:", error.message);
    return {
      success: false,
      error: "Failed to fetch related artists",
    };
  }
}

export async function getTrackDetails(trackId) {
  try {
    const endpoint = DEMO_MODE ? `/tracks/${trackId}` : `/track/${trackId}`;
    const response = await apiClient.get(endpoint);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error fetching track details:", error.message);
    return {
      success: false,
      error: "Failed to fetch track details",
    };
  }
}
