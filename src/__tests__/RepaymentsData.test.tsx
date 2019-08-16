import React from 'react';
import RepaymentsData from '../RepaymentsData';

describe('RepaymentsData', () => {
  it('calculates some stuff and passes it down', () => {
    const data = mount(
      <RepaymentsData
        loanAmount={1000}
        annualInterestRate={3.6}
        loanLengthInYears={3}
        monthlyRepayments={30}
      />,
    );

    const graph = data.find('RepaymentsGraph');
    const stats = data.find('RepaymentsStats');

    expect(graph.prop('years')).toHaveLength(3);
    expect(graph.prop('loanAmount')).toEqual(1000);
    expect(stats.prop('stats')).toEqual(
      expect.objectContaining({
        totalAmountPaid: 1080,
      }),
    );
  });
});
