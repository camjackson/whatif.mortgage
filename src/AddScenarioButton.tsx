import React, { FC } from 'react';
import PlusInCircle from './icons/PlusInCircle';

type Props = {
  addScenario: () => void;
};

const AddScenarioButton: FC<Props> = ({ addScenario }) => (
  <button
    className="block panel rounded-sm min-h-80 text-green-500"
    onClick={addScenario}
    title="Add scenario"
  >
    <PlusInCircle hoverColorClassName="group-hover:text-green-200" />
  </button>
);

export default AddScenarioButton;
