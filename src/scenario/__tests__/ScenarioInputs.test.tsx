import React from 'react';
import { mount } from 'enzyme';
import ScenarioInputs from '../ScenarioInputs';

describe('ScenarioInputs', () => {
  let addFieldToScenario: any;
  let removeFieldFromScenario: any;
  let change: any;

  const renderScenarioInputs = (props: any = {}) => {
    addFieldToScenario = jest.fn();
    removeFieldFromScenario = jest.fn();
    change = jest.fn();
    return mount(
      <ScenarioInputs
        index={0}
        scenario={{}}
        addFieldToScenario={addFieldToScenario}
        removeFieldFromScenario={removeFieldFromScenario}
        setValue={fieldKey => event => change(fieldKey, event.target.value)}
        {...props}
      />,
    );
  };

  it('has no inputs if the scenario has no overrides', () => {
    const scenarioInputs = renderScenarioInputs();
    expect(scenarioInputs.find('input')).toHaveLength(0);
  });

  it('can add a field', () => {
    const scenarioInputs = renderScenarioInputs();

    scenarioInputs
      .find('select')
      .simulate('change', { target: { value: 'some-field' } });

    expect(addFieldToScenario).toHaveBeenCalledWith('some-field');
  });

  it('can have an interest rate input', () => {
    const scenarioInputs = renderScenarioInputs({
      scenario: { annualInterestRate: 3.4 },
    });

    const input = scenarioInputs.find('input#annualInterestRate-0');
    expect(input).toHaveValue(3.4);

    input.simulate('change', { target: { value: 5.6 } });
    expect(change).toHaveBeenCalledWith('annualInterestRate', 5.6);

    scenarioInputs.find('button').simulate('click');
    expect(removeFieldFromScenario).toHaveBeenCalledWith('annualInterestRate');
  });

  it('can have an offset amount input', () => {
    const scenarioInputs = renderScenarioInputs({
      scenario: { constantOffsetAmount: 20 },
    });

    const input = scenarioInputs.find('input#constantOffsetAmount-0');
    expect(input).toHaveValue(20);

    input.simulate('change', { target: { value: 50 } });
    expect(change).toHaveBeenCalledWith('constantOffsetAmount', 50);

    scenarioInputs.find('button').simulate('click');
    expect(removeFieldFromScenario).toHaveBeenCalledWith(
      'constantOffsetAmount',
    );
  });

  it('can have an offset increment input', () => {
    const scenarioInputs = renderScenarioInputs({
      scenario: { monthlyOffsetIncrement: 2 },
    });

    const input = scenarioInputs.find('input#monthlyOffsetIncrement-0');
    expect(input).toHaveValue(2);

    input.simulate('change', { target: { value: 5 } });
    expect(change).toHaveBeenCalledWith('monthlyOffsetIncrement', 5);

    scenarioInputs.find('button').simulate('click');
    expect(removeFieldFromScenario).toHaveBeenCalledWith(
      'monthlyOffsetIncrement',
    );
  });
});
