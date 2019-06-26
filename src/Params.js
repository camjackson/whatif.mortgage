import React from 'react';
import BlurryTextInput from './BlurryTextInput';

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
    <BlurryTextInput
      label="Loan amount: $"
      defaultValue={loanAmount}
      onBlur={setLoanAmount}
    />
    <BlurryTextInput
      label="Interest rate:"
      labelAfter=" % p.a."
      defaultValue={annualInterestRate}
      onBlur={setAnnualInterestRate}
    />
    <BlurryTextInput
      label="Loan length:"
      labelAfter=" years"
      defaultValue={loanLengthInYears}
      onBlur={setLoanLengthInYears}
    />
    <BlurryTextInput
      label="Monthly repayments"
      defaultValue={monthlyRepayments}
      readOnly
    />
  </section>
);
export default Params;
