import React from "react";

function TimeRange({ activeRange, setTimeRange }) {
  return (
    <div className="h-full w-full flex text-xs sm:flex-row justify-evenly sm:gap-4 md:gap-6 sm:text-base text-gray-400 font-semibold mt-6 sm:mt-0">
      <div
        className={`${
          activeRange === "long_term"
            ? "border-b-2 border-white text-white"
            : ""
        } hover:text-white cursor-pointer text-center sm:text-left`}
        onClick={() => setTimeRange("long_term")}
      >
        All Time
      </div>
      <div
        className={`${
          activeRange === "medium_term"
            ? "border-b-2 border-white text-white"
            : ""
        } hover:text-white cursor-pointer text-center sm:text-left`}
        onClick={() => setTimeRange("medium_term")}
      >
        Last 6 Months
      </div>
      <div
        className={`${
          activeRange === "short_term"
            ? "border-b-2 border-white text-white"
            : ""
        } hover:text-white cursor-pointer text-center sm:text-left`}
        onClick={() => setTimeRange("short_term")}
      >
        Last 4 Weeks
      </div>
    </div>
  );
}

export default TimeRange;
