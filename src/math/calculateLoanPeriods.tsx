import LoanPeriod from './LoanPeriod';
import { Scenario } from '../models';

export type SummaryStats = {
  totalInterestPaid: number;
  totalAmountPaid: number;
  interestToPrincipalRatio: number;
};

type FullStats = {
  months: LoanPeriod[];
  years: LoanPeriod[];
  stats: SummaryStats;
};

const calculateLoanPeriods = (
  scenario: Scenario,
  monthlyRepayments: number,
): FullStats => {
  const {
    loanAmount,
    annualInterestRate,
    loanLengthInYears,
    constantOffsetAmount = 0,
  } = scenario;

  const monthlyInterestRate = annualInterestRate / 12;
  const numberOfMonths = loanLengthInYears * 12;
  const months: LoanPeriod[] = [];
  const stats: SummaryStats = {
    totalInterestPaid: 0,
    totalAmountPaid: 0,
    interestToPrincipalRatio: 0,
  };

  // Month 0 is just the initial state
  months.push(new LoanPeriod(0, 0, loanAmount));

  // Month 1 tells us how much we owe after the first month's payment
  for (let i = 1; i <= numberOfMonths; i++) {
    const month = months[i - 1].createNextLoanPeriod(
      monthlyInterestRate,
      monthlyRepayments,
      constantOffsetAmount,
    );
    months.push(month);
    stats.totalInterestPaid += month.interestPaid;
    stats.totalAmountPaid += month.interestPaid + month.principalPaid;
  }
  stats.interestToPrincipalRatio = (stats.totalInterestPaid / loanAmount) * 100;

  const years: LoanPeriod[] = [];
  for (let yearIndex = 1; yearIndex <= loanLengthInYears; yearIndex++) {
    const beforeFirstMonth = (yearIndex - 1) * 12 + 1;
    const afterLastMonth = yearIndex * 12 + 1;
    const relevantMonths = months.slice(beforeFirstMonth, afterLastMonth);

    years.push(LoanPeriod.sumPeriods(relevantMonths));
  }

  return { months, years, stats };
};

export default calculateLoanPeriods;
