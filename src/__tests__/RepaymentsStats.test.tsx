import React from 'react';
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
});
