import React, { FC } from 'react';

const plusPath = `
  M12 6 V18
  M6 12 H18
`;

type Props = {
  hoverColorClassName: string;
};

const PlusInCircle: FC<Props> = ({ hoverColorClassName }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="64"
    height="64"
    className="m-auto group fill-none stroke-current"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      className={`fill-current stroke-none text-transparent ${hoverColorClassName}`}
    />
    <circle cx="12" cy="12" r="10" />
    <path d={plusPath} />
  </svg>
);

export default PlusInCircle;
