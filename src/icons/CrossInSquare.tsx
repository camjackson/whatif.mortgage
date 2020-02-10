import React, { FC } from 'react';

const fillPath = `
  M0 0 H24 V24 H0 V0
`;
const strokePath = `
  M0 0 H24 V24 H0 V0
  M6 6 L18 18
  M18 6 L6 18
`;

type Props = {
  hoverColorClassName: string;
};

const CrossInSquare: FC<Props> = ({ hoverColorClassName }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    className="fill-none stroke-current"
  >
    <path
      d={fillPath}
      className={`fill-current stroke-none text-transparent ${hoverColorClassName}`}
    />
    <path d={strokePath} />
  </svg>
);

export default CrossInSquare;
