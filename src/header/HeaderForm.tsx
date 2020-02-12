import React, { FC } from 'react';
import { BaseScenario, ScenarioKey } from '../models';
import { LoanAmountInput, InterestRateInput, YearsInput } from '../form/Inputs';

type Props = {
  baseScenario: BaseScenario;
  setValue: (key: ScenarioKey) => (event) => void;
};

const narrowClasses = 'flex-col text-xl';
const wideClasses = 'md:flex-row md:text-3xl';

const HeaderForm: FC<Props> = ({ baseScenario, setValue }) => {
  return (
    <form
      noValidate
      className={`h-full flex items-center justify-center flex-1 font-thin ${narrowClasses} ${wideClasses}`}
    >
      <span className="md:mr-2">
        I will borrow $
        <LoanAmountInput
          value={baseScenario.loanAmount}
          onChange={setValue(ScenarioKey.loanAmount)}
        />
      </span>
      <span>
        at{' '}
        <InterestRateInput
          value={baseScenario.annualInterestRate}
          onChange={setValue(ScenarioKey.annualInterestRate)}
        />{' '}
        %p.a., over{' '}
        <YearsInput
          style={{ marginLeft: 10 }}
          value={baseScenario.loanLengthInYears}
          onChange={setValue(ScenarioKey.loanLengthInYears)}
        />{' '}
        years
      </span>
    </form>
  );
};
export default HeaderForm;
