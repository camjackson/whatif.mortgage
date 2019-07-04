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
    />
    <BlurryNumberInput
      label="Interest rate:"
      labelAfter=" % p.a."
      defaultValue={annualInterestRate}
      onBlur={setAnnualInterestRate}
    />
    <BlurryNumberInput
      label="Loan length:"
      labelAfter=" years"
      defaultValue={loanLengthInYears}
      onBlur={setLoanLengthInYears}
    />
    <BlurryNumberInput
      label="Monthly repayments"
      value={monthlyRepayments}
      readOnly
    />
  </section>
);
export default Params;
