import React, { FC } from 'react';
import PlusInCircle from './icons/PlusInCircle';

type Props = {
  addScenario: () => void;
};

const AddScenarioButton: FC<Props> = ({ addScenario }) => (
  <button
    className="block panel rounded-sm text-xl text-green-500"
    onClick={addScenario}
    title="Add scenario"
  >
    <PlusInCircle />
  </button>
);

export default AddScenarioButton;
