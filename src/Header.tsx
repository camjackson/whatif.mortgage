import React, { FC } from 'react';
import { BaseScenario, ScenarioKey } from './models';
import { LoanAmountInput, InterestRateInput, YearsInput } from './form/Inputs';

type Props = {
  baseScenario: BaseScenario;
  setValue: (key: ScenarioKey) => (event) => void;
};

const Header: FC<Props> = ({ baseScenario, setValue }) => (
  <header className="shadow-md fixed w-full h-20 top-0 bg-gray-100">
    <form className="flex justify-center items-center h-full text-4xl font-thin">
      I will borrow $
      <LoanAmountInput
        value={baseScenario.loanAmount}
        onChange={setValue(ScenarioKey.loanAmount)}
      />
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
    </form>
  </header>
);

export default Header;
