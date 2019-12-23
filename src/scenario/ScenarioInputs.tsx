import React, { FC } from 'react';
import { BaseScenario, Scenario, ScenarioKey } from '../models';
import { LoanAmountInput, InterestRateInput } from '../form/Inputs';

type Props = {
  baseScenario: BaseScenario;
  scenario: Scenario;
  setValue: (key: ScenarioKey) => (event) => void;
};

const ScenarioInputs: FC<Props> = ({ baseScenario, scenario, setValue }) => (
  <form style={{ gridArea: 'form' }} className="flex flex-col">
    <label>
      New interest rate:{' '}
      <InterestRateInput
        value={
          scenario.annualInterestRate !== undefined
            ? scenario.annualInterestRate
            : baseScenario.annualInterestRate
        }
        onChange={setValue(ScenarioKey.annualInterestRate)}
      />
      %
    </label>
    <label>
      Amount in offset account: $
      <LoanAmountInput
        value={scenario.constantOffsetAmount || 0}
        onChange={setValue(ScenarioKey.constantOffsetAmount)}
      />
    </label>
  </form>
);

export default ScenarioInputs;
