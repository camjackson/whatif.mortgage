import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  display: block;
`;

const BlurryTextInput = ({ label, defaultValue, onChange }) => (
  <Label>
    {label}:{' '}
    <input
      type="text"
      defaultValue={defaultValue}
      onBlur={event => onChange(event.target.value)}
    />
  </Label>
);

const Params = ({
  loanAmount,
  annualInterestRate,
  loanLengthInYears,
  monthlyRepayments,
  setLoanAmount,
  setAnnualInterestRate,
  setLoanLengthInYears,
  setMonthlyRepayments,
}) => (
  <section>
    <BlurryTextInput
      label="Loan amount"
      defaultValue={loanAmount}
      onChange={setLoanAmount}
    />
    <BlurryTextInput
      label="Interest rate"
      defaultValue={annualInterestRate}
      onChange={setAnnualInterestRate}
    />
    <BlurryTextInput
      label="Loan length (years)"
      defaultValue={loanLengthInYears}
      onChange={setLoanLengthInYears}
    />
    <BlurryTextInput
      label="Monthly repayments"
      defaultValue={monthlyRepayments}
      onChange={setMonthlyRepayments}
    />
  </section>
);
export default Params;
