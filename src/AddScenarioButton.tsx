import React, { FC } from 'react';

type Props = {
  addScenario: any;
};

const plusPath = `
  M12 6 V18
  M6 12 H18
`;

const AddScenarioButton: FC<Props> = ({ addScenario }) => (
  <button
    className="block panel rounded-sm text-xl"
    onClick={addScenario}
    title="Add scenario"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="64"
      height="64"
      className="m-auto stroke-current text-green-500"
    >
      <path d={plusPath} />
      <circle cx="12" cy="12" r="10" className="stroke-current fill-none" />
    </svg>
  </button>
);

export default AddScenarioButton;
