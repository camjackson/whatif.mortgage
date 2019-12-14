import React from 'react';
import RepaymentsData from './RepaymentsData';

const Scenario = ({ loanAmount, annualInterestRate, loanLengthInYears }) => (
  <RepaymentsData
    loanAmount={loanAmount}
    annualInterestRate={annualInterestRate}
    loanLengthInYears={loanLengthInYears}
  />
);

export default Scenario;
