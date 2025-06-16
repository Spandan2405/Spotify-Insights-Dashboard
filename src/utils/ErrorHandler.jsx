import React from "react";
import Loader from "../components/Loader";

function ErrorHandler({ loading, error }) {
  if (loading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  if (error)
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center text-lg md:text-2xl text-white text-center">
        {error}
        {
          <button className="px-8 py-4 text-white bg-green-500 mt-6 rounded-full text-xl font-semibold">
            <a href="https://spotify-backend-six.vercel.app/auth/login">
              Log in with Spotify
            </a>
          </button>
        }
      </div>
    );
}

export default ErrorHandler;
