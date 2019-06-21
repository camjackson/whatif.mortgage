import React from 'react';

class LoanPeriod {
  constructor(startingPrincipal, periodicInterestRate, repayment) {
    this.interestPaid = (startingPrincipal * periodicInterestRate) / 100;
    this.principalPaid = repayment - this.interestPaid;
    this.endingPrincipal = startingPrincipal - this.principalPaid;
  }

  createNextLoanPeriod(periodicInterestRate, repayment) {
    return new LoanPeriod(
      this.endingPrincipal,
      periodicInterestRate,
      repayment,
    );
  }

  static sumPeriods(periods) {
    return periods.reduce(
      (sum, period) => ({
        interestPaid: sum.interestPaid + period.interestPaid,
        principalPaid: sum.principalPaid + period.principalPaid,
        endingPrincipal: period.endingPrincipal,
      }),
      { interestPaid: 0, principalPaid: 0 },
    );
  }
}

const formatOpts = {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
};
const format = number => number.toLocaleString(undefined, formatOpts);

const Graph = ({
  loanAmount,
  annualInterestRate,
  loanLengthInYears,
  monthlyRepayments,
}) => {
  const monthlyInterestRate = annualInterestRate / 12;
  const numberOfMonths = loanLengthInYears * 12;
  const months = [];

  // Month 0 is just the starting state
  months.push(new LoanPeriod(loanAmount, 0, 0));

  // Month 1 tells us how much we owe after the first month's payment
  for (let i = 1; i <= numberOfMonths; i++) {
    months.push(
      months[i - 1].createNextLoanPeriod(
        monthlyInterestRate,
        monthlyRepayments,
      ),
    );
  }

  const years = [];
  for (let yearIndex = 1; yearIndex <= loanLengthInYears; yearIndex++) {
    const beforeFirstMonth = (yearIndex - 1) * 12;
    const afterLastMonth = yearIndex * 12;
    const relevantMonths = months.slice(beforeFirstMonth, afterLastMonth);

    years.push(LoanPeriod.sumPeriods(relevantMonths));
  }
  console.log('YEARS', years);

  return (
    <table>
      <thead>
        <tr>
          <th>After year</th>
          <th>Interest paid</th>
          <th>Principal paid</th>
          <th>Principal remaining</th>
        </tr>
      </thead>
      <tbody>
        {years.map((year, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{format(year.interestPaid)}</td>
            <td>{format(year.principalPaid)}</td>
            <td>{format(year.endingPrincipal)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Graph;
