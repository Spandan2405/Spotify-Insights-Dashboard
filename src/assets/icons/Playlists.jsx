import React from "react";

function Playlists({ width, height, className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width={width}
      height={height}
      className={className}
      fill="currentColor"
      viewBox="0 0 405.333 405.333"
    >
      <g>
        <rect x="0" y="53.333" width="256" height="42.667"></rect>
        <rect x="0" y="138.667" width="256" height="42.667"></rect>
        <path d="M298.667,53.333v174.613c-6.72-2.453-13.76-3.947-21.333-3.947c-35.307,0-64,28.693-64,64c0,35.307,28.693,64,64,64     c35.307,0,64-28.693,64-64V96h64V53.333H298.667z"></path>
        <rect x="0" y="224" width="170.667" height="42.667"></rect>
      </g>
    </svg>
  );
}

export default Playlists;
