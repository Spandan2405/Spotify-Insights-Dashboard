import React from "react";
import { Link } from "react-router-dom";

function TopArtistList({ artists }) {
  // console.log(artists);
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex justify-between items-center">
        <p className="text-lg text-white font-bold">Top Artists of All Time</p>
        <div className="hover:cursor-pointer px-6 py-3 font-bold border border-white rounded-full text-white text-xs md:text-sm hover:bg-white hover:text-zinc-900 transition duration-200 ease-in-out whitespace-nowrap">
          <Link to="/top-artists">
            <button className="">SEE MORE</button>
          </Link>
        </div>
      </div>
      <div>
        <ul className="w-full flex flex-col md:flex-col gap-6 mt-8">
          {artists.map((artist, i) => (
            <li key={i} className="group hover:cursor-pointer">
              <Link to={`artist/${artist.id}`}>
                <div className="w-full flex gap-4 items-center">
                  {artist.images[0] && (
                    <div className="w-12 h-12 rounded-full overflow-hidden group-hover:opacity-50">
                      <img src={artist.images[0].url} alt={artist.name} />
                    </div>
                  )}
                  <h3 className="text-white text-md font-medium tracking-wide ml-2">
                    {artist.name}
                  </h3>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TopArtistList;
