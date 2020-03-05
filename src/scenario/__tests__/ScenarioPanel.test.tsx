import React from 'react';
import { mount } from 'enzyme';
import ScenarioPanel from '../ScenarioPanel';
import { SummaryStats } from '../../math/calculateLoanPeriods';
import { formatCurrency } from '../../formatting';

describe('ScenarioPanel', () => {
  const baseScenario = {
    loanAmount: 1000,
    annualInterestRate: 4.8,
    loanLengthInYears: 3,
  };
  const baseScenarioStats: SummaryStats = {
    totalInterestPaid: 0,
    totalAmountPaid: 0,
    interestToPrincipalRatio: 0,
    monthsFinishedEarly: 0,
  };

  it('calculates some stuff and passes it down', () => {
    const calculateRepayment = jest.fn(() => 27.78);
    const panel = mount(
      <ScenarioPanel
        index={0}
        baseScenario={baseScenario}
        baseScenarioMonthlyRepayments={0}
        baseScenarioStats={baseScenarioStats}
        scenario={{}}
        setValue={() => () => {}}
        calculateRepayment={calculateRepayment}
        removeScenario={() => {}}
        addFieldToScenario={() => {}}
        removeFieldFromScenario={() => {}}
        formatCurrency={formatCurrency('$')}
      />,
    );

    expect(calculateRepayment).toHaveBeenCalledWith(1000, 0.004, 36);

    const graph = panel.find('RepaymentsGraph');
    const stats = panel.find('RepaymentsStats');

    expect(graph.prop('years')).toHaveLength(3);
    expect(stats.prop('stats').totalAmountPaid).toBeCloseTo(27.78 * 3 * 12);
  });

  it('applies overrides to the base scenario', () => {
    const calculateRepayment = jest.fn(() => 20);
    const panel = mount(
      <ScenarioPanel
        index={0}
        baseScenario={baseScenario}
        baseScenarioMonthlyRepayments={0}
        baseScenarioStats={baseScenarioStats}
        scenario={{ annualInterestRate: 2.4 }}
        setValue={() => () => {}}
        calculateRepayment={calculateRepayment}
        removeScenario={() => {}}
        addFieldToScenario={() => {}}
        removeFieldFromScenario={() => {}}
        formatCurrency={formatCurrency('$')}
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
