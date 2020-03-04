import React, { FC, CSSProperties } from 'react';

const burgerPath = `
  M6 8 L18 8
  M6 12 L18 12
  M6 16 L18 16
`;

const svgStyles: CSSProperties = {
  strokeWidth: 1.5,
  strokeLinecap: 'round',
};

type Props = {
  className: string;
};

const Hamburger: FC<Props> = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="36"
    height="36"
    className={`stroke-current ${className}`}
    style={svgStyles}
  >
    <path d={burgerPath} className="fill-none" />
  </svg>
);

export default Hamburger;
