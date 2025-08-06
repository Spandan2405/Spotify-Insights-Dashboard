import { useContext } from "react";
import { SpotifyContext } from "../context/SpotifyContext";
import { Link } from "react-router-dom";
import ErrorHandler from "../utils/ErrorHandler";
import TimeRange from "../components/TimeRange";
import { useEffect } from "react";
import { getTopArtists } from "../utils/spotify";
import { useState } from "react";
import Info from "../assets/icons/Info";

function Artists() {
  const { loading, error, timeRange, setTimeRange, setLoading, setError } =
    useContext(SpotifyContext);
  const [topartists, setTopArtists] = useState([]);
  const DEMO_MODE = localStorage.setItem("spotify_demo_mode", "true");
  useEffect(() => {
    try {
      setLoading(true);
      const fetchArtists = async (timeRange) => {
        const userArtists = await getTopArtists(
          DEMO_MODE ? timeRange : { timeRange }
        );
        if (!userArtists.success) throw new Error(userArtists.error);
        setTopArtists(userArtists.data);
      };
      fetchArtists(timeRange);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching artists:", err.message);
    } finally {
      setLoading(false);
    }
  }, [timeRange, setLoading, setError]);

  if (loading || error) {
    return <ErrorHandler loading={loading} error={error} />;
  }

  // console.log(topartists);
  //Features - Artist info page , and different time duration favorites
  return (
    <main>
      {topartists && (
        <div className="h-full xl:px-40 xl:py-20 md:p-20 px-6 py-12">
          <div className="w-full justify-between flex flex-col md:flex-row">
            <h1 className="text-xl md:text-2xl text-white font-bold text-center">
              Top Artists
            </h1>
            <div className="">
              <TimeRange activeRange={timeRange} setTimeRange={setTimeRange} />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 md:gap-12 md:px-8 md:py-8 my-8">
            {topartists.items?.length === 0 && (
              <h1 className="text-lg text-gray-400 font-semibold">
                No Artists were found
              </h1>
            )}
            {topartists?.items?.map((artist) => (
              <div
                className="flex flex-col items-center justify-center"
                key={artist.name}
              >
                <Link to={`/artist/${artist.id}`}>
                  <div className="relative group transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:cursor-pointer">
                    <div className="w-30 h-30 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-48 xl:h-48 rounded-full overflow-hidden cursor-pointer ">
                      <img
                        src={artist.images[0].url}
                        alt={artist.name}
                        className="hover:opacity-50 w-full h-full object-cover"
                      />
                      <div className="absolute top-2/5 left-2/5 w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <Info className="text-white bg-white" />
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="mt-4 text-center">
                  <Link to={artist?.external_urls?.spotify}>
                    <span className="flex flex-wrap font-semibold text-md md:text-lg text-white hover:border-b-1 cursor-pointer transition duration-200 ease-in-out">
                      {artist.name}
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

export default Artists;
