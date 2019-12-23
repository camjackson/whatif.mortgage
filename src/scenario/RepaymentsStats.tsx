import React, { FC } from 'react';
import { formatCurrency, formatInteger } from '../formatting';
import { SummaryStats } from '../math/calculateLoanPeriods';

type Props = {
  monthlyRepayments: number;
  stats: SummaryStats;
};

const RepaymentsStats: FC<Props> = ({ monthlyRepayments, stats }) => (
  <p
    style={{ gridArea: 'stats' }}
    className="text-3xl font-hairline leading-tight"
  >
    With monthly repayments of{' '}
    <strong className="underline">{formatCurrency(monthlyRepayments)}</strong>,{' '}
    <br /> your total interest bill will be{' '}
    <strong className="underline">
      {formatCurrency(stats.totalInterestPaid)}
    </strong>
    ,
    <br /> or{' '}
    <strong className="underline">
      {formatInteger(stats.interestToPrincipalRatio)}%
    </strong>{' '}
    of the amount you borrowed.
  </p>
);

export default RepaymentsStats;
