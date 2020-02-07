import React, { FC } from 'react';
import CrossInSquare from '../icons/CrossInSquare';

type Props = {
  index: number;
  removeScenario: (index: number) => void;
};

const ScenarioHeader: FC<Props> = ({ index, removeScenario }) => (
  <div
    style={{ gridArea: 'header' }}
    className="justify-self-stretch flex justify-end"
  >
    {index !== 0 && (
      <button
        className="mr-2 text-red-600 font-hairline underline text-base"
        onClick={() => removeScenario(index)}
        title="Remove"
      >
        <CrossInSquare />
      </button>
    )}
  </div>
);

export default ScenarioHeader;
