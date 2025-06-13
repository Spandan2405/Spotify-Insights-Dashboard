import React from "react";
import Timeconverter from "../utils/Timeconverter";
import { Link } from "react-router-dom";

function TopTrackList({ tracks }) {
  //   console.log(tracks);
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex justify-between items-center">
        <p className="text-lg text-white font-bold">Top Tracks of All Time</p>
        <div className="hover:cursor-pointer px-6 py-3 font-bold border border-white rounded-full text-white text-xs md:text-sm hover:bg-white hover:text-zinc-900 transition duration-200 ease-in-out whitespace-nowrap">
          <Link to="/top-tracks">
            <button className="">SEE MORE</button>
          </Link>
        </div>
      </div>
      <div>
        <ul className="w-full flex flex-col md:flex-col gap-4 md:gap-6 mt-8">
          {tracks.map((track, i) => (
            <li key={i}>
              <Link to={`/track/${track.id}`}>
                <div className="w-full flex gap-4 items-center justify-center group">
                  {track.album.images[0] && (
                    <div className="w-15 h-15 md:w-12 md:h-12 content-center group-hover:opacity-50 transition ease-in-out duration-400">
                      <img src={track.album.images[0].url} alt={track.name} />
                    </div>
                  )}
                  <div className="w-full h-full flex justify-between md:items-center">
                    <div className="flex flex-col text-left space-y-1">
                      <div className="text-white text-md font-medium line-clamp-1 ">
                        <span className="hover:border-b-1">{track.name}</span>
                      </div>
                      <p className="text-xs text-zinc-400 line-clamp-1">
                        {track.album.artists[0].name} - {track.album.name}
                      </p>
                    </div>
                    <div className="text-gray-400 text-sm text-right">
                      {Timeconverter(track.duration_ms)}
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TopTrackList;
