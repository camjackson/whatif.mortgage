import React from 'react';
import formatCurrency from './formatCurrency';

const RepaymentsStats = ({ stats }) => (
  <div>
    <ol>
      <li>Total interest paid: {formatCurrency(stats.totalInterestPaid)}</li>
      <li>Total amount paid: {formatCurrency(stats.totalAmountPaid)}</li>
    </ol>
  </div>
);

export default RepaymentsStats;
