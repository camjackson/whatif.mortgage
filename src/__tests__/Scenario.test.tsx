import React from 'react';
import Scenario from '../Scenario';

jest.mock('../math/calculateRepayment', () => () => 30);

describe('Scenario', () => {
  it('calculates some stuff and passes it down', () => {
    const data = mount(
      <Scenario
        loanAmount={1000}
        annualInterestRate={3.6}
        loanLengthInYears={3}
      />,
    );

    const graph = data.find('RepaymentsGraph');
    const stats = data.find('RepaymentsStats');

    expect(graph.prop('years')).toHaveLength(3);
    expect(graph.prop('loanAmount')).toEqual(1000);
    expect(stats.prop('stats')).toEqual(
      expect.objectContaining({
        totalAmountPaid: 30 * 3 * 12,
      }),
    );
  });
});
