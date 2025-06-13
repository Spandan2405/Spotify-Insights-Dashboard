import React from "react";
import { NavLink } from "react-router-dom";
import User from "../assets/icons/User";
import Recent from "../assets/icons/Recent";
import Music from "../assets/icons/Music";
import Mic from "../assets/icons/Mic";
import Playlists from "../assets/icons/Playlists";
import Spotify from "../assets/logo/spotify";
import Github from "../assets/logo/Github";

const Sidebar = () => {
  const navigationItems = [
    { id: "", label: "Profile", icon: User },
    { id: "top-artists", label: "Top Artists", icon: Mic },
    { id: "top-tracks", label: "Top Tracks", icon: Music },
    { id: "recent", label: "Recent", icon: Recent },
    { id: "playlists", label: "Playlists", icon: Playlists },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-16 lg:w-24 bg-black h-screen fixed left-0 top-0 flex-col justify-between py-6 sm:py-8 lg:py-10">
        {/* Spotify Logo */}
        <div className="flex items-center justify-center text-green-500">
          <Spotify className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
        </div>
        {/* Navigation Items */}
        <nav className="flex w-full">
          <ul className="w-full flex flex-col items-center">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id} className="w-full">
                  <NavLink
                    to={`/${item.id}`}
                    className={({ isActive }) =>
                      `flex flex-col items-center px-2 py-3 transition-all duration-200 ${
                        isActive
                          ? "bg-gray-900 border-l-4 border-green-500 text-white"
                          : "text-gray-500 hover:bg-gray-900 hover:border-l-4 hover:border-green-500 hover:text-white"
                      }`
                    }
                  >
                    <Icon
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      style={{
                        color: ({ isActive }) =>
                          isActive ? "#1DB954" : "gray",
                      }}
                    />
                    <span className="text-xs font-medium mt-1">
                      {item.label}
                    </span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
        {/* GitHub Link */}
        <div className="flex items-center justify-center">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-300"
          >
            <Github
              xmlSpace="preserve"
              className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
            />
          </a>
        </div>
      </div>
      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 left-0 w-full bg-black flex justify-around items-center md:hidden z-50 sm:py-3">
        <ul className="w-full flex justify-evenly">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id} className="w-1/5">
                <NavLink
                  to={`/${item.id}`}
                  className={({ isActive }) =>
                    `flex flex-col items-center justify-center py-2 sm:py-3 text-[9px] sm:text-[10px] font-medium tracking-tighter transition-all duration-200 ${
                      isActive
                        ? "text-white border-t-3 border-green-500"
                        : "text-gray-400 hover:text-white hover:border-t-2 hover:border-green-500"
                    }`
                  }
                >
                  <Icon
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    style={{
                      color: ({ isActive }) => (isActive ? "#1DB954" : "gray"),
                    }}
                  />
                  <span className="text-[9px] sm:text-[10px] font-medium tracking-tighter mt-1">
                    {item.label}
                  </span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
