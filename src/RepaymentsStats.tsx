import React, { FunctionComponent as FC } from 'react';
import formatCurrency from './formatCurrency';
import { SummaryStats } from './math/calculateLoanPeriods';

type Props = {
  stats: SummaryStats;
};

const RepaymentsStats: FC<Props> = ({ stats }) => (
  <div>
    <ol>
      <li>Total interest paid: {formatCurrency(stats.totalInterestPaid)}</li>
      <li>Total amount paid: {formatCurrency(stats.totalAmountPaid)}</li>
    </ol>
  </div>
);

export default RepaymentsStats;
