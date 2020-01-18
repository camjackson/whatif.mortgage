import React, { FC } from 'react';
import { BaseScenario, Scenario, ScenarioKey } from '../models';
import { LoanAmountInput, InterestRateInput } from '../form/Inputs';

type Props = {
  baseScenario: BaseScenario;
  scenario: Scenario;
  setValue: (key: ScenarioKey) => (event) => void;
};

const Label = props => <label className="justify-self-end mr-2" {...props} />;

const ScenarioInputs: FC<Props> = ({ baseScenario, scenario, setValue }) => (
  <form noValidate style={{ gridArea: 'form' }} className="grid cols-auto-auto">
    <Label htmlFor="thingy">Interest rate: </Label>
    <span>
      <InterestRateInput
        id="thingy"
        value={
          scenario.annualInterestRate !== undefined
            ? scenario.annualInterestRate
            : baseScenario.annualInterestRate
        }
        onChange={setValue(ScenarioKey.annualInterestRate)}
      />
      %
    </span>
    <Label htmlFor="thingy">Initial offset:</Label>
    <span>
      $
      <LoanAmountInput
        id="thingy"
        value={scenario.constantOffsetAmount || 0}
        onChange={setValue(ScenarioKey.constantOffsetAmount)}
      />
    </span>
    <Label htmlFor="thingy">Offset / m:</Label>
    <span>
      $
      <LoanAmountInput
        id="thingy"
        value={scenario.monthlyOffsetIncrement || 0}
        onChange={setValue(ScenarioKey.monthlyOffsetIncrement)}
      />
    </span>
  </form>
);

export default ScenarioInputs;
