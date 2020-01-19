import React from 'react';
import { mount } from 'enzyme';
import RepaymentsStats from '../RepaymentsStats';
import { SummaryStats } from '../math/calculateLoanPeriods';

describe('RepaymentsStats', () => {
  const stats: SummaryStats = {
    totalInterestPaid: 100,
    totalAmountPaid: 200,
    interestToPrincipalRatio: 8,
  };
  const baseScenarioStats: SummaryStats = {
    totalInterestPaid: 120,
    totalAmountPaid: 220,
    interestToPrincipalRatio: 10,
  };
  it('formats the stats data', () => {
    const repaymentsStats = mount(
      <RepaymentsStats
        monthlyRepayments={20}
        stats={stats}
        baseScenarioMonthlyRepayments={25}
        baseScenarioStats={baseScenarioStats}
      />,
    );

    expect(repaymentsStats).toIncludeText('Repayments:$20($-5)');
    expect(repaymentsStats).toIncludeText('Total interest:$100($-20)');
    expect(repaymentsStats).toIncludeText('Margin:8%(-2%)');
  });

  describe('early exit stat', () => {
    const renderWithMonthsEarly = monthsFinishedEarly => {
      const statsWithEarlyFinish: SummaryStats = {
        ...stats,
        monthsFinishedEarly,
      };
      return mount(
        <RepaymentsStats
          monthlyRepayments={20}
          stats={statsWithEarlyFinish}
          baseScenarioMonthlyRepayments={25}
          baseScenarioStats={baseScenarioStats}
        />,
      );
    };

    it('hides the stat when the loan was not exited early', () => {
      const repaymentsStats = renderWithMonthsEarly(0);

      expect(repaymentsStats).not.toIncludeText('exit the loan');
    });

    it('shows the stat correctly for different month amounts', () => {
      const testCases = [
        { months: 1, text: 'Early exit:1m' },
        { months: 2, text: 'Early exit:2m' },
        { months: 12, text: 'Early exit:1y' },
        { months: 13, text: 'Early exit:1y, 1m' },
        { months: 18, text: 'Early exit:1y, 6m' },
        { months: 24, text: 'Early exit:2y' },
        { months: 25, text: 'Early exit:2y, 1m' },
        { months: 28, text: 'Early exit:2y, 4m' },
      ];

      testCases.forEach(testCase => {
        const repaymentsStats = renderWithMonthsEarly(testCase.months);

        expect(repaymentsStats).toIncludeText(testCase.text);
      });
    });
  });
});
