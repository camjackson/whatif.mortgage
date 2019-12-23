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

    expect(repaymentsStats).toIncludeText('monthly repayments of $20');
    expect(repaymentsStats).toIncludeText(
      'your total interest bill will be $100',
    );
    expect(repaymentsStats).toIncludeText('or 8% of the amount you borrowed');
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
        { months: 1, text: 'exit the loan 1 month early' },
        { months: 2, text: 'exit the loan 2 months early' },
        { months: 12, text: 'exit the loan 1 year early' },
        { months: 13, text: 'exit the loan 1 year and 1 month early' },
        { months: 18, text: 'exit the loan 1 year and 6 months early' },
        { months: 24, text: 'exit the loan 2 years' },
        { months: 25, text: 'exit the loan 2 years and 1 month early' },
        { months: 28, text: 'exit the loan 2 years and 4 months early' },
      ];

      testCases.forEach(testCase => {
        const repaymentsStats = renderWithMonthsEarly(testCase.months);

        expect(repaymentsStats).toIncludeText(testCase.text);
      });
    });
  });
});
