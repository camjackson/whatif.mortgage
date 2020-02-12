import React, { FC } from 'react';
import { formatCurrency, formatInteger } from '../formatting';
import { SummaryStats } from '../math/calculateLoanPeriods';
import { Th, Td } from './Table';

type Props = {
  monthlyRepayments: number;
  stats: SummaryStats;
  baseScenarioMonthlyRepayments: number;
  baseScenarioStats: SummaryStats;
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

const getColourClassName = (value: number): string =>
  value < 0 ? 'text-green-500' : value > 0 ? 'text-red-500' : 'text-blue-500';

const plusOrNot = (value: number): string => (value > 0 ? '+' : '');

const RepaymentsStats: FC<Props> = ({
  monthlyRepayments,
  stats,
  baseScenarioMonthlyRepayments,
  baseScenarioStats,
}) => {
  const repaymentChange = monthlyRepayments - baseScenarioMonthlyRepayments;
  const interestChange =
    stats.totalInterestPaid - baseScenarioStats.totalInterestPaid;
  const marginChange =
    stats.interestToPrincipalRatio - baseScenarioStats.interestToPrincipalRatio;

  return (
    <table
      style={{ gridArea: 'stats' }}
      className="my-2 w-full border-gray-600"
    >
      <tbody>
        <tr>
          <Th>Repayments:</Th>
          <Td>{formatCurrency(monthlyRepayments)}</Td>
          <Td className={getColourClassName(repaymentChange)}>
            ({plusOrNot(repaymentChange)}
            {formatCurrency(repaymentChange)})
          </Td>
        </tr>
        <tr>
          <Th>Total interest:</Th>
          <Td>{formatCurrency(stats.totalInterestPaid)}</Td>
          <Td className={getColourClassName(interestChange)}>
            ({plusOrNot(interestChange)}
            {formatCurrency(interestChange)})
          </Td>
        </tr>
        <tr>
          <Th>Margin:</Th>
          <Td>{formatInteger(stats.interestToPrincipalRatio)}%</Td>
          <Td className={getColourClassName(marginChange)}>
            ({plusOrNot(marginChange)}
            {formatInteger(marginChange)}%)
          </Td>
        </tr>
        {stats.monthsFinishedEarly !== 0 && (
          <tr>
            <Th>Early exit:</Th>
            <Td />
            <Td className="text-green-500">
              {formatMonths(stats.monthsFinishedEarly)}
            </Td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default RepaymentsStats;
