import React from 'react';
import { mount } from 'enzyme';
import ScenarioInputs from '../ScenarioInputs';

describe('ScenarioInputs', () => {
  const baseScenario = {
    loanAmount: 100,
    annualInterestRate: 1.2,
    loanLengthInYears: 5,
  };

  it('has an interest rate input', () => {
    const change = jest.fn();
    const inputs = mount(
      <ScenarioInputs
        baseScenario={baseScenario}
        scenario={{ annualInterestRate: 3.4 }}
        setValue={key => event => change(key, event.target.value)}
      />,
    );
    const interestRateInput = inputs.find('input').at(0);
    expect(interestRateInput).toHaveValue(3.4);

    interestRateInput.simulate('change', { target: { value: 5.6 } });
    expect(change).toHaveBeenCalledWith('annualInterestRate', 5.6);
  });

  it('defaults the interest rate to the base rate', () => {
    const inputs = mount(
      <ScenarioInputs
        baseScenario={baseScenario}
        scenario={{}}
        setValue={() => () => {}}
      />,
    );
    const interestRateInput = inputs.find('input').at(0);
    expect(interestRateInput).toHaveValue(1.2);
  });

  it('allows the interest rate to be overridden to 0', () => {
    const inputs = mount(
      <ScenarioInputs
        baseScenario={baseScenario}
        scenario={{ annualInterestRate: 0 }}
        setValue={() => () => {}}
      />,
    );
    const interestRateInput = inputs.find('input').at(0);
    expect(interestRateInput).toHaveValue(0);
  });

  it('has an offset amount input', () => {
    const change = jest.fn();
    const inputs = mount(
      <ScenarioInputs
        baseScenario={baseScenario}
        scenario={{ constantOffsetAmount: 20 }}
        setValue={key => event => change(key, event.target.value)}
      />,
    );
    const offsetAmountInput = inputs.find('input').at(1);
    expect(offsetAmountInput).toHaveValue(20);

    offsetAmountInput.simulate('change', { target: { value: 30 } });
    expect(change).toHaveBeenCalledWith('constantOffsetAmount', 30);
  });

  it('defaults the offset amount to 0', () => {
    const inputs = mount(
      <ScenarioInputs
        baseScenario={baseScenario}
        scenario={{}}
        setValue={() => () => {}}
      />,
    );
    const offsetAmountInput = inputs.find('input').at(1);
    expect(offsetAmountInput).toHaveValue(0);
  });
});
