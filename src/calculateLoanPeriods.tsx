export class LoanPeriod {
  constructor(
    public interestPaid: number,
    public principalPaid: number,
    public endingPrincipal: number,
  ) {}

  static calculate(startingPrincipal, periodicInterestRate, repayment) {
    const interestPaid = (startingPrincipal * periodicInterestRate) / 100;
    const principalPaid = repayment - interestPaid;
    const endingPrincipal = startingPrincipal - principalPaid;

    return new LoanPeriod(interestPaid, principalPaid, endingPrincipal);
  }

  createNextLoanPeriod(periodicInterestRate, repayment) {
    return LoanPeriod.calculate(
      this.endingPrincipal,
      periodicInterestRate,
      repayment,
    );
  }

  getTotal() {
    return this.interestPaid + this.principalPaid + this.endingPrincipal;
  }

  static sumPeriods(periods) {
    return periods.reduce(
      (sum, period) => {
        return new LoanPeriod(
          sum.interestPaid + period.interestPaid,
          sum.principalPaid + period.principalPaid,
          period.endingPrincipal,
        );
      },
      { interestPaid: 0, principalPaid: 0 },
    );
  }
}

const calculateLoanPeriods = (
  loanAmount,
  annualInterestRate,
  loanLengthInYears,
  monthlyRepayments,
) => {
  const monthlyInterestRate = annualInterestRate / 12;
  const numberOfMonths = loanLengthInYears * 12;
  const months: LoanPeriod[] = [];
  const stats = {
    totalInterestPaid: 0,
    totalAmountPaid: 0,
  };

  // Month 0 is just the starting state
  months.push(LoanPeriod.calculate(loanAmount, 0, 0));

  // Month 1 tells us how much we owe after the first month's payment
  for (let i = 1; i <= numberOfMonths; i++) {
    const month = months[i - 1].createNextLoanPeriod(
      monthlyInterestRate,
      monthlyRepayments,
    );
    months.push(month);
    stats.totalInterestPaid += month.interestPaid;
    stats.totalAmountPaid += month.interestPaid + month.principalPaid;
  }

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
