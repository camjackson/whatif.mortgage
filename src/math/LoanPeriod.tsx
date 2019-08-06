export default class LoanPeriod {
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
