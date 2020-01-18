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
    formatAmount(wholeYears, 'y'),
    formatAmount(leftOverMonths, 'm'),
  ].filter(s => s !== '');

  return formattedQuantities.join(', ');
};
const formatAmount = (qty: number, unit: string) => {
  return qty === 0 ? '' : `${qty}${unit}`;
};

const Th: FC = props => <th className="font-hairline text-right" {...props} />;
const Td: FC = props => <td className="font-normal text-left" {...props} />;

const RepaymentsStats: FC<Props> = ({ monthlyRepayments, stats }) => (
  <>
    <table style={{ gridArea: 'stats' }}>
      <tbody>
        <tr>
          <Th>Repayments:</Th>
          <Td>{formatCurrency(monthlyRepayments)} / m</Td>
        </tr>
        <tr>
          <Th>Total interest:</Th>
          <Td>{formatCurrency(stats.totalInterestPaid)}</Td>
        </tr>
        <tr>
          <Th>Interest margin:</Th>
          <Td>{formatInteger(stats.interestToPrincipalRatio)}%</Td>
        </tr>
        {stats.monthsFinishedEarly !== 0 && (
          <tr>
            <Th>Early exit:</Th>
            <Td>{formatMonths(stats.monthsFinishedEarly)}</Td>
          </tr>
        )}
      </tbody>
    </table>
    <p className="leading-tight p-2"></p>
  </>
);

export default RepaymentsStats;
