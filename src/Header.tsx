import React, { FC } from 'react';
import { BaseScenario, ScenarioKey } from './models';

const NumberInput = props => (
  <input
    className="border-b-2 border-gray-700 bg-transparent"
    type="number"
    {...props}
  />
);

const getLoanAmountStep = (loanAmount: number): number =>
  Math.pow(10, Math.floor(Math.log10(loanAmount)) - 1);

type Props = {
  baseScenario: BaseScenario;
  setValue: (key: ScenarioKey) => (event) => void;
};

const Header: FC<Props> = ({ baseScenario, setValue }) => (
  <header className="shadow-md fixed w-full h-20 top-0 bg-gray-100">
    <form className="flex justify-center items-center h-full text-4xl font-thin">
      I will borrow $
      <NumberInput
        min="0"
        max="10000000"
        step={getLoanAmountStep(baseScenario.loanAmount)}
        formNoValidate
        style={{ width: 160 }}
        value={baseScenario.loanAmount}
        onChange={setValue(ScenarioKey.loanAmount)}
      />
      at{' '}
      <NumberInput
        min="0.01"
        max="99"
        step="0.01"
        style={{ width: 100, textAlign: 'right' }}
        value={baseScenario.annualInterestRate}
        onChange={setValue(ScenarioKey.annualInterestRate)}
      />{' '}
      %p.a., over{' '}
      <NumberInput
        min="1"
        max="99"
        step="1"
        style={{ width: 60, marginLeft: 10 }}
        value={baseScenario.loanLengthInYears}
        onChange={setValue(ScenarioKey.loanLengthInYears)}
      />{' '}
      years
    </form>
  </header>
);

export default Header;
