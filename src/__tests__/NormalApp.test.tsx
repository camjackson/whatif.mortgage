import React from 'react';
import NormalApp from '../NormalApp';

describe('NormalApp', () => {
  it('calculates the monthly repayments', () => {
    const app = mount(
      <NormalApp
        loanAmount={1000}
        annualInterestRate={3.6}
        loanLengthInYears={3}
        setValue={() => {}}
      />,
    );
    expect(app.find('Params').prop('monthlyRepayments')).toBeCloseTo(29.35);
    expect(app.find('RepaymentsData').prop('monthlyRepayments')).toBeCloseTo(
      29.35,
    );
  });
});
