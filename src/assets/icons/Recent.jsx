import React from "react";

function Recent({ width, height, className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width={width}
      height={height}
      className={className}
      fill="currentColor"
      viewBox="0 0 510 510"
    >
      <title>Time</title>
      <g>
        <g id="history">
          <path d="M267.75,12.75c-89.25,0-168.3,48.45-209.1,122.4L0,76.5v165.75h165.75    l-71.4-71.4c33.15-63.75,96.9-107.1,173.4-107.1C372.3,63.75,459,150.45,459,255s-86.7,191.25-191.25,191.25    c-84.15,0-153-53.55-181.05-127.5H33.15c28.05,102,122.4,178.5,234.6,178.5C402.9,497.25,510,387.6,510,255    C510,122.4,400.35,12.75,267.75,12.75z M229.5,140.25V270.3l119.85,71.4l20.4-33.15l-102-61.2v-107.1H229.5z"></path>
        </g>
      </g>
    </svg>
  );
}

export default Recent;
