import React, { FC } from 'react';
import { formatCurrency, formatInteger } from '../formatting';
import { SummaryStats } from '../math/calculateLoanPeriods';

type Props = {
  monthlyRepayments: number;
  stats: SummaryStats;
};

const formatMonths = (months: number) => {
  const leftOverMonths = months % 12;
  const wholeYears = (months - leftOverMonths) / 12;

  const formattedQuantities = [
    formatAmount(wholeYears, 'year'),
    formatAmount(leftOverMonths, 'month'),
  ].filter(s => s !== '');

  return formattedQuantities.join(' and ');
};
const formatAmount = (qty: number, unit: string) => {
  return qty === 0 ? '' : qty === 1 ? `1 ${unit}` : `${qty} ${unit}s`;
};

const RepaymentsStats: FC<Props> = ({ monthlyRepayments, stats }) => (
  <p style={{ gridArea: 'stats' }} className="leading-tight p-2">
    With monthly repayments of{' '}
    <strong>{formatCurrency(monthlyRepayments)}</strong>, <br /> your total
    interest bill will be{' '}
    <strong>{formatCurrency(stats.totalInterestPaid)}</strong>
    ,
    <br /> or <strong>
      {formatInteger(stats.interestToPrincipalRatio)}%
    </strong>{' '}
    of the amount you borrowed.
    {stats.monthsFinishedEarly !== 0 && (
      <>
        <br />
        You'll exit the loan{' '}
        <strong>{formatMonths(stats.monthsFinishedEarly)} early</strong>!
      </>
    )}
  </p>
);

export default RepaymentsStats;
