import React, { FC } from 'react';
import { Scenario, ScenarioKey } from './models';

type Props = {
  scenario: Scenario;
  setValue: (key: ScenarioKey) => (event) => void;
};

const ScenarioInputs: FC<Props> = ({ scenario, setValue }) => (
  <form style={{ gridArea: 'form' }}>
    <label>
      New interest rate:{' '}
      <input
        type="number"
        min={0.01}
        max={99.99}
        step={0.01}
        value={scenario.annualInterestRate}
        onChange={setValue(ScenarioKey.annualInterestRate)}
      />
    </label>
  </form>
);

export default ScenarioInputs;
