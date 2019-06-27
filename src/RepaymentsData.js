import React from 'react';
import RepaymentsTable from './RepaymentsTable';
import RepaymentsGraph from './RepaymentsGraph';
import calculateLoanPeriods from './calculateLoanPeriods';

const RepaymentsData = ({
  loanAmount,
  annualInterestRate,
  loanLengthInYears,
  monthlyRepayments,
}) => {
  const { years } = calculateLoanPeriods(
    loanAmount,
    annualInterestRate,
    loanLengthInYears,
    monthlyRepayments,
  );
  return (
    <div>
      <RepaymentsTable years={years} />
      <RepaymentsGraph years={years} />
    </div>
  );
};

export default RepaymentsData;
