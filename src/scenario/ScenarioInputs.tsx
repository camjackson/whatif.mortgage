import React, { FC } from 'react';
import { Scenario, ScenarioKey } from '../models';
import ScenarioFieldSelector, {
  selectableFieldLabels,
  selectableFieldKeys,
} from './ScenarioFieldSelector';
import { Th, Td } from './Table';
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

const ScenarioInputs: FC<Props> = ({
  index,
  scenario,
  addFieldToScenario,
  removeFieldFromScenario,
  setValue,
}) => (
  <form noValidate style={{ gridArea: 'form' }} className="my-2 lg:mr-2">
    <table className="w-full">
      <tbody>
        {selectableFieldKeys.map(fieldKey => {
          if (scenario[fieldKey] === undefined) {
            return null;
          }
          const InputComponent = inputComponentMap[fieldKey];
          const id = `${fieldKey}-${index}`;

          return (
            <tr key={fieldKey}>
              <Th>
                <label htmlFor={id}>{selectableFieldLabels[fieldKey]}:</label>
              </Th>
              <Td className="text-center">
                <InputComponent
                  id={id}
                  value={scenario[fieldKey]}
                  onChange={setValue(fieldKey)}
                />
              </Td>
              <Td className="text-center">
                <button
                  onClick={() => removeFieldFromScenario(fieldKey)}
                  className="text-red-600 align-middle"
                  title="Remove"
                >
                  <CrossInCircle />
                </button>
              </Td>
            </tr>
          );
        })}
        <tr>
          <Td colSpan={3} className="text-center">
            <ScenarioFieldSelector
              scenario={scenario}
              addFieldToScenario={addFieldToScenario}
            />
          </Td>
        </tr>
      </tbody>
    </table>
  </form>
);

export default ScenarioInputs;
