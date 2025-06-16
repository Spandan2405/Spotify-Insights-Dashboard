import { Link } from "react-router-dom";
import Profile from "../assets/icons/ProfileImg";
import { logout } from "../utils/spotify";
import RandomProfileGenerator from "../utils/RandomProfileGenerator";

function UserProfile({ profile, following, playlists }) {
  return (
    <>
      {profile && following && playlists && (
        <div className="flex flex-col items-center px-4 sm:px-6 md:px-8 py-6 sm:py-8">
          {/* Profile Picture */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full border-2 border-white mt-6 sm:mt-8 md:mt-12 flex items-center justify-center overflow-hidden">
            <div className="w-full h-full object-contain p-0 m-0">
              {profile.images.length && profile.images[0].url ? (
                <img
                  className="w-full h-full object-cover"
                  src={profile.images[0].url}
                  alt="Avatar"
                />
              ) : (
                (
                  <RandomProfileGenerator className="w-full h-full object-contain" />
                ) ?? <Profile className="w-full h-full object-contain p-4" />
              )}
            </div>
          </div>

          {/* Username */}
          <div className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white my-4 sm:my-5 md:my-6 text-center">
            <a
              href={profile.external_urls?.spotify}
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="text-white hover:text-green-500 transition duration-200 ease-in-out">
                {profile.display_name || "Spandan Gupta"}
              </p>
            </a>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-6 sm:gap-8 md:gap-10 text-center flex-wrap">
            <div className="flex flex-col">
              <p className="text-green-500 text-base sm:text-lg font-bold">
                {profile.followers.total || 0}
              </p>
              <p className="text-gray-400 text-xs sm:text-sm tracking-wider font-semibold">
                FOLLOWERS
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-green-500 text-base sm:text-lg font-bold">
                {following?.artists.total || 0}
              </p>
              <p className="text-gray-400 text-xs sm:text-sm tracking-wider font-semibold">
                FOLLOWING
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-green-500 text-base sm:text-lg font-bold">
                {playlists?.total || 0}
              </p>
              <p className="text-gray-400 text-xs sm:text-sm tracking-wider font-semibold">
                PLAYLISTS
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <div className="my-6 sm:my-8">
            <button
              className="hover:cursor-pointer px-6 py-3 font-bold border border-white rounded-full text-white text-xs md:text-sm hover:bg-white hover:text-zinc-900 transition duration-200 ease-in-out whitespace-nowrap"
              onClick={logout}
            >
              LOGOUT
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default UserProfile;
