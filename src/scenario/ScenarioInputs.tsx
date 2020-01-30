import React, { FC } from 'react';
import { Scenario, ScenarioKey } from '../models';
import ScenarioFieldSelector, {
  selectableFieldLabels,
  selectableFieldKeys,
} from './ScenarioFieldSelector';
import { LoanAmountInput, InterestRateInput } from '../form/Inputs';
import CrossInCircle from '../icons/CrossInCircle';

const InterestRateInputWithPercentSign = (props: any) => (
  <span>
    <InterestRateInput {...props} />%
  </span>
);
const LoanAmountInputWithDollarSign = (props: any) => (
  <span>
    $<LoanAmountInput {...props} />
  </span>
);

const inputComponentMap = {
  [ScenarioKey.annualInterestRate]: InterestRateInputWithPercentSign,
  [ScenarioKey.constantOffsetAmount]: LoanAmountInputWithDollarSign,
  [ScenarioKey.monthlyOffsetIncrement]: LoanAmountInputWithDollarSign,
  [ScenarioKey.monthlyRepayment]: LoanAmountInputWithDollarSign,
};

type Props = {
  index: number;
  scenario: Scenario;
  addFieldToScenario: (key: ScenarioKey) => void;
  removeFieldFromScenario: (key: ScenarioKey) => void;
  setValue: (key: ScenarioKey) => (event: any) => void;
};

const Label = (props: any) => (
  <label className="justify-self-end mr-2" {...props} />
);

const ScenarioInputs: FC<Props> = ({
  index,
  scenario,
  addFieldToScenario,
  removeFieldFromScenario,
  setValue,
}) => (
  <form noValidate style={{ gridArea: 'form' }} className="grid cols-auto-3">
    {selectableFieldKeys.map(fieldKey => {
      if (scenario[fieldKey] === undefined) {
        return null;
      }
      const InputComponent = inputComponentMap[fieldKey];
      const id = `${fieldKey}-${index}`;
      return (
        <React.Fragment key={fieldKey}>
          <Label htmlFor={id}>{selectableFieldLabels[fieldKey]}:</Label>
          <InputComponent
            id={id}
            value={scenario[fieldKey]}
            onChange={setValue(fieldKey)}
          />
          <button
            onClick={() => removeFieldFromScenario(fieldKey)}
            className="text-red-600"
            title="Remove"
          >
            <CrossInCircle />
          </button>
        </React.Fragment>
      );
    })}
    <ScenarioFieldSelector
      scenario={scenario}
      addFieldToScenario={addFieldToScenario}
    />
  </form>
);

export default ScenarioInputs;
