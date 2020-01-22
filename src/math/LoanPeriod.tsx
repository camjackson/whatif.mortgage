export default class LoanPeriod {
  constructor(
    public interestPaid: number,
    public principalPaid: number,
    public endingPrincipal: number,
    public totalSavedOffset: number,
  ) {}

  private static calculate(
    startingPrincipal: number,
    periodicInterestRate: number,
    repayment: number,
    offsetAmount: number,
  ): LoanPeriod {
    const effectivePrincipal = Math.max(startingPrincipal - offsetAmount, 0);
    const interestPaid = (effectivePrincipal * periodicInterestRate) / 100;
    const principalPaid = Math.min(repayment - interestPaid, startingPrincipal);
    const endingPrincipal = startingPrincipal - principalPaid;

    return new LoanPeriod(
      interestPaid,
      principalPaid,
      endingPrincipal,
      offsetAmount,
    );
  }

  createNextLoanPeriod(
    periodicInterestRate: number,
    repayment: number,
    offsetAmount: number,
  ): LoanPeriod {
    return LoanPeriod.calculate(
      this.endingPrincipal,
      periodicInterestRate,
      repayment,
      offsetAmount,
    );
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
        period.totalSavedOffset,
      );
    }, new LoanPeriod(0, 0, 0, undefined));
  }
}
