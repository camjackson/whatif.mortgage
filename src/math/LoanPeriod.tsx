export default class LoanPeriod {
  constructor(
    public interestPaid: number,
    public principalPaid: number,
    public endingPrincipal: number,
  ) {}

  private static calculate(
    startingPrincipal: number,
    periodicInterestRate: number,
    repayment: number,
  ): LoanPeriod {
    const interestPaid = (startingPrincipal * periodicInterestRate) / 100;
    const principalPaid = repayment - interestPaid;
    const endingPrincipal = startingPrincipal - principalPaid;

    return new LoanPeriod(interestPaid, principalPaid, endingPrincipal);
  }

  createNextLoanPeriod(periodicInterestRate: number, repayment: number): LoanPeriod {
    return LoanPeriod.calculate(this.endingPrincipal, periodicInterestRate, repayment);
  }

  getTotal(): number {
    return this.interestPaid + this.principalPaid + this.endingPrincipal;
  }

  static sumPeriods(periods: LoanPeriod[]): LoanPeriod {
    return periods.reduce((sum, period) => {
      return new LoanPeriod(
        sum.interestPaid + period.interestPaid,
        sum.principalPaid + period.principalPaid,
        period.endingPrincipal,
      );
    }, new LoanPeriod(0, 0, 0));
  }
}
