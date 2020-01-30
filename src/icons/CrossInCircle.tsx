import React from 'react';

const crossInCirclePath = `
  M7 7 L17 17
  M17 7 L7 17
`;

const CrossInCircle = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    className="stroke-current"
  >
    <path d={crossInCirclePath} className="fill-none" />
    <circle cx="12" cy="12" r="10" className="fill-none" />
  </svg>
);

export default CrossInCircle;
