import React, { FunctionComponent as FC } from 'react';
import styled from 'styled-components';
import RepaymentsGraph from './graph/RepaymentsGraph';
import RepaymentsStats from './RepaymentsStats';
import calculateLoanPeriods from './math/calculateLoanPeriods';
import calculateRepayment from './math/calculateRepayment';

const Section = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 5rem;
`;

type Props = {
  loanAmount: number;
  annualInterestRate: number;
  loanLengthInYears: number;
};

const Scenario: FC<Props> = ({
  loanAmount,
  annualInterestRate,
  loanLengthInYears,
}) => {
  const monthlyRepayments: number = calculateRepayment(
    loanAmount,
    annualInterestRate / 100 / 12,
    loanLengthInYears * 12,
  );

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

export default Scenario;
