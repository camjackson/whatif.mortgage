import React from 'react';
import ScenarioPanel from '../ScenarioPanel';

describe('ScenarioPanel', () => {
  const baseScenario = {
    loanAmount: 1000,
    annualInterestRate: 4.8,
    loanLengthInYears: 3,
  };
  it('calculates some stuff and passes it down', () => {
    const calculateRepayment = jest.fn(() => 30);
    const panel = mount(
      <ScenarioPanel
        hideInputs
        baseScenario={baseScenario}
        scenario={{}}
        setValue={() => {}}
        calculateRepayment={calculateRepayment}
      />,
    );

    expect(calculateRepayment).toHaveBeenCalledWith(1000, 0.004, 36);

    const graph = panel.find('RepaymentsGraph');
    const stats = panel.find('RepaymentsStats');

    expect(graph.prop('years')).toHaveLength(3);
    expect(stats.prop('stats')).toEqual(
      expect.objectContaining({
        totalAmountPaid: 30 * 3 * 12,
      }),
    );
  });

  it('applies overrides to the base scenario', () => {
    const calculateRepayment = jest.fn(() => 20);
    const panel = mount(
      <ScenarioPanel
        hideInputs
        baseScenario={baseScenario}
        scenario={{ annualInterestRate: 2.4 }}
        setValue={() => {}}
        calculateRepayment={calculateRepayment}
      />,
    );

    expect(calculateRepayment).toHaveBeenCalledWith(1000, 0.002, 36);

    const graph = panel.find('RepaymentsGraph');
    const stats = panel.find('RepaymentsStats');

    expect(graph.prop('years')).toHaveLength(3);
    expect(stats.prop('stats')).toEqual(
      expect.objectContaining({
        totalAmountPaid: 20 * 3 * 12,
      }),
    );
  });
});
