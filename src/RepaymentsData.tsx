import React, { FunctionComponent as FC } from 'react';
import styled from 'styled-components';
import RepaymentsTable from './RepaymentsTable';
import RepaymentsGraph from './graph/RepaymentsGraph';
import RepaymentsStats from './RepaymentsStats';
import calculateLoanPeriods from './math/calculateLoanPeriods';

const Section = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

type Props = {
  loanAmount: number;
  annualInterestRate: number;
  loanLengthInYears: number;
  monthlyRepayments: number;
};

const RepaymentsData: FC<Props> = ({
  loanAmount,
  annualInterestRate,
  loanLengthInYears,
  monthlyRepayments,
}) => {
  const { years, stats } = calculateLoanPeriods(
    loanAmount,
    annualInterestRate,
    loanLengthInYears,
    monthlyRepayments,
  );
  return (
    <Section>
      <RepaymentsStats monthlyRepayments={monthlyRepayments} stats={stats} />
      <RepaymentsGraph years={years} loanAmount={loanAmount} />
    </Section>
  );
};

export default RepaymentsData;
