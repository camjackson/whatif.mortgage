import React, { FC } from 'react';
import { BaseScenario, Scenario, ScenarioKey } from '../models';
import { LoanAmountInput, InterestRateInput } from '../form/Inputs';

type Props = {
  index: number;
  baseScenario: BaseScenario;
  scenario: Scenario;
  setValue: (key: ScenarioKey) => (event) => void;
};

const Label = props => <label className="justify-self-end mr-2" {...props} />;

const ScenarioInputs: FC<Props> = ({
  index,
  baseScenario,
  scenario,
  setValue,
}) => (
  <form
    noValidate
    style={{ gridArea: 'form' }}
    className="grid cols-auto-auto border-b-1 border-gray-600 pb-3"
  >
    <Label htmlFor={`annualInterestRate-${index}`}>Interest rate: </Label>
    <span>
      <InterestRateInput
        id={`annualInterestRate-${index}`}
        value={
          scenario.annualInterestRate !== undefined
            ? scenario.annualInterestRate
            : baseScenario.annualInterestRate
        }
        onChange={setValue(ScenarioKey.annualInterestRate)}
      />
      %
    </span>
    <Label htmlFor={`constantOffsetAmount-${index}`}>Initial offset:</Label>
    <span>
      $
      <LoanAmountInput
        id={`constantOffsetAmount-${index}`}
        value={scenario.constantOffsetAmount || 0}
        onChange={setValue(ScenarioKey.constantOffsetAmount)}
      />
    </span>
    <Label htmlFor={`monthlyOffsetIncrement-${index}`}>Offset / m:</Label>
    <span>
      $
      <LoanAmountInput
        id={`monthlyOffsetIncrement-${index}`}
        value={scenario.monthlyOffsetIncrement || 0}
        onChange={setValue(ScenarioKey.monthlyOffsetIncrement)}
      />
    </span>
    <Label htmlFor={`monthlyRepayment-${index}`}>Monthly repayment:</Label>
    <span>
      $
      <LoanAmountInput
        id={`monthlyRepayment-${index}`}
        value={scenario.monthlyRepayment || 0}
        onChange={setValue(ScenarioKey.monthlyRepayment)}
      />
    </span>
  </form>
);

export default ScenarioInputs;
