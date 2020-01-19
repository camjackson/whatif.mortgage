import React, { FC } from 'react';

type Props = {
  index: number;
  removeScenario: (index: number) => void;
};

const crossInSquarePath = `
  M0 0 H24 V24 H0 V0
  M6 6 L18 18
  M18 6 L6 18
`;

const ScenarioHeader: FC<Props> = ({ index, removeScenario }) => (
  <div
    style={{ gridArea: 'header' }}
    className="justify-self-stretch flex justify-end"
  >
    {index !== 0 && (
      <button
        className="text-red-600 font-hairline underline text-base"
        onClick={() => removeScenario(index)}
        title="Remove"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="stroke-current"
        >
          <path d={crossInSquarePath} className="fill-none" />
        </svg>
      </button>
    )}
  </div>
);

export default ScenarioHeader;
