import React from 'react';
import { mount } from 'enzyme';
import RepaymentsStats from '../RepaymentsStats';
import { SummaryStats } from '../math/calculateLoanPeriods';

describe('RepaymentsStats', () => {
  it('formats the stats data', () => {
    const stats: SummaryStats = {
      totalInterestPaid: 100,
      totalAmountPaid: 200,
      interestToPrincipalRatio: 8,
    };
    const repaymentsStats = mount(
      <RepaymentsStats monthlyRepayments={20} stats={stats} />,
    );

    expect(repaymentsStats).toIncludeText('Repayments:$20');
    expect(repaymentsStats).toIncludeText('Total interest:$100');
    expect(repaymentsStats).toIncludeText('Interest margin:8%');
  });

  describe('early exit stat', () => {
    const renderWithMonthsEarly = monthsFinishedEarly => {
      const stats: SummaryStats = {
        totalInterestPaid: 100,
        totalAmountPaid: 200,
        interestToPrincipalRatio: 8,
        monthsFinishedEarly,
      };
      return mount(<RepaymentsStats monthlyRepayments={20} stats={stats} />);
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
