import React from 'react';

const plusPath = `
  M12 6 V18
  M6 12 H18
`;

const PlusInCircle = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="64"
    height="64"
    className="m-auto stroke-current"
  >
    <path d={plusPath} />
    <circle cx="12" cy="12" r="10" className="fill-none" />
  </svg>
);

export default PlusInCircle;
