import React, { FunctionComponent as FC } from 'react';
import styled from 'styled-components';
import { formatCurrency, formatInteger } from './formatting';
import { SummaryStats } from './math/calculateLoanPeriods';

const P = styled.p`
  font-size: 3rem;
  font-weight: lighter;
  line-height: 1.2;
`;

const Strong = styled.strong`
  text-decoration: underline;
`;

type Props = {
  monthlyRepayments: number;
  stats: SummaryStats;
};

const RepaymentsStats: FC<Props> = ({ monthlyRepayments, stats }) => (
  <P>
    With monthly repayments of{' '}
    <Strong>{formatCurrency(monthlyRepayments)}</Strong>, <br /> your total
    interest bill will be{' '}
    <Strong>{formatCurrency(stats.totalInterestPaid)}</Strong>,<br /> or{' '}
    <Strong>{formatInteger(stats.interestToPrincipalRatio)}%</Strong> of the
    amount you borrowed.
  </P>
);

export default RepaymentsStats;
