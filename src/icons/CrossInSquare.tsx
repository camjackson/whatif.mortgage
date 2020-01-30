import React from 'react';

const crossInSquarePath = `
  M0 0 H24 V24 H0 V0
  M6 6 L18 18
  M18 6 L6 18
`;

const CrossInSquare = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    className="stroke-current"
  >
    <path d={crossInSquarePath} className="fill-none" />
  </svg>
);

export default CrossInSquare;
