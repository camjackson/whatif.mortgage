import React from 'react';
import BlurryNumberInput from './BlurryNumberInput';

const Params = ({
  loanAmount,
  annualInterestRate,
  loanLengthInYears,
  monthlyRepayments,
  setLoanAmount,
  setAnnualInterestRate,
  setLoanLengthInYears,
}) => (
  <section>
    <BlurryNumberInput
      label="Loan amount: $"
      defaultValue={loanAmount}
      onBlur={setLoanAmount}
      min="0"
      max="100000000"
      step="1"
    />
    <BlurryNumberInput
      label="Interest rate:"
      labelAfter=" % p.a."
      defaultValue={annualInterestRate}
      onBlur={setAnnualInterestRate}
      min="0"
      max="99.99"
      step="0.01"
    />
    <BlurryNumberInput
      label="Loan length:"
      labelAfter=" years"
      defaultValue={loanLengthInYears}
      onBlur={setLoanLengthInYears}
      min="0"
      max="99"
      step="1"
    />
    <BlurryNumberInput
      label="Monthly repayments"
      value={monthlyRepayments}
      readOnly
    />
  </section>
);
export default Params;
