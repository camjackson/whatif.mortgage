import React from 'react';
import RepaymentsStats from '../RepaymentsStats';
import { SummaryStats } from '../math/calculateLoanPeriods';

describe('RepaymentsStats', () => {
  it('formats the stats data', () => {
    const stats: SummaryStats = {
      totalInterestPaid: 100,
      totalAmountPaid: 200,
    };
    const repaymentsStats = mount(<RepaymentsStats stats={stats} />);

    expect(repaymentsStats).toIncludeText('Total interest paid: USD 100');
    expect(repaymentsStats).toIncludeText('Total amount paid: USD 200');
  });
});
