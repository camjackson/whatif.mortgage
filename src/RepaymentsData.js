import React from 'react';
import styled from 'styled-components';
import RepaymentsTable from './RepaymentsTable';
import RepaymentsGraph from './RepaymentsGraph';
import calculateLoanPeriods from './calculateLoanPeriods';

const Section = styled.section`
  display: flex;
`;

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
    <Section>
      <RepaymentsTable years={years} />
      <RepaymentsGraph years={years} loanAmount={loanAmount} />
    </Section>
  );
};

export default RepaymentsData;
