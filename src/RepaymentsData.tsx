import React, { FunctionComponent as FC } from 'react';
import styled from 'styled-components';
import RepaymentsTable from './RepaymentsTable';
import RepaymentsGraph from './graph/RepaymentsGraph';
import RepaymentsStats from './RepaymentsStats';
import calculateLoanPeriods from './math/calculateLoanPeriods';

const Section = styled.section`
  display: flex;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
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
      <RepaymentsTable years={years} />
      <Column>
        <RepaymentsGraph years={years} loanAmount={loanAmount} />
        <RepaymentsStats stats={stats} />
      </Column>
    </Section>
  );
};

export default RepaymentsData;
