import React, { FC } from 'react';
import { BaseScenario, Scenario, ScenarioKey } from '../models';
import { LoanAmountInput, InterestRateInput } from '../form/Inputs';

type Props = {
  baseScenario: BaseScenario;
  scenario: Scenario;
  setValue: (key: ScenarioKey) => (event) => void;
};

const ScenarioInputs: FC<Props> = ({ baseScenario, scenario, setValue }) => (
  <form noValidate style={{ gridArea: 'form' }} className="flex flex-col">
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
      Constant offset: $
      <LoanAmountInput
        value={scenario.constantOffsetAmount || 0}
        onChange={setValue(ScenarioKey.constantOffsetAmount)}
      />
    </label>
    <label>
      Extra offset per month: $
      <LoanAmountInput
        value={scenario.monthlyOffsetIncrement || 0}
        onChange={setValue(ScenarioKey.monthlyOffsetIncrement)}
      />
    </label>
  </form>
);

export default ScenarioInputs;
