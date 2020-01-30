import React, { FC } from 'react';
import { Scenario, ScenarioKey } from '../models';

export const selectableFieldLabels = {
  [ScenarioKey.annualInterestRate]: 'Interest rate',
  [ScenarioKey.constantOffsetAmount]: 'Initial offset',
  [ScenarioKey.monthlyOffsetIncrement]: 'Offset / m',
  [ScenarioKey.monthlyRepayment]: 'Monthly repayment',
};
export const selectableFieldKeys: ScenarioKey[] = Object.keys(
  selectableFieldLabels,
) as ScenarioKey[];

type Props = {
  scenario: Scenario;
  addFieldToScenario: (key: ScenarioKey) => void;
};

const gridSpanStyle = {
  gridColumn: '1 / span 3',
};

const ScenarioFieldSelector: FC<Props> = ({ scenario, addFieldToScenario }) => {
  const onChange = event => addFieldToScenario(event.target.value);
  return (
    <select
      style={gridSpanStyle}
      value=""
      onChange={onChange}
      className="font-hairline"
    >
      <option value="">Change variable...</option>
      {selectableFieldKeys.map(
        key =>
          scenario[key] === undefined && (
            <option key={key} value={key}>
              {selectableFieldLabels[key]}
            </option>
          ),
      )}
    </select>
  );
};

export default ScenarioFieldSelector;
