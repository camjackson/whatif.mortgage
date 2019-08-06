import LoanPeriod from '../LoanPeriod';

describe('LoanPeriod', () => {
  const startingPrincipal = 1000;
  const interestRate = 4.5;
  const repayment = 120;

  it('can calculate a period based on mortgage information', () => {
    const period = LoanPeriod.calculate(startingPrincipal, interestRate, repayment);

    expect(period.interestPaid).toEqual(45);
    expect(period.principalPaid).toEqual(75);
    expect(period.endingPrincipal).toEqual(925);
  });

  it('can construct the next period from the previous period', () => {
    const periodZero = new LoanPeriod(0, 0, 1000);

    const periodOne = periodZero.createNextLoanPeriod(interestRate, repayment);

    expect(periodOne.interestPaid).toEqual(45);
    expect(periodOne.principalPaid).toEqual(75);
    expect(periodOne.endingPrincipal).toEqual(925);
  });

  it('can get the total of the loan period', () => {
    const period = new LoanPeriod(45, 75, 925);

    expect(period.getTotal()).toEqual(1045);
  });

  it('can sum up multiple periods', () => {
    const periods: LoanPeriod[] = [
      new LoanPeriod(0, 0, 1000),
      new LoanPeriod(45, 180, 820),
      new LoanPeriod(35, 190, 630),
      new LoanPeriod(25, 200, 430),
      new LoanPeriod(15, 210, 220),
      new LoanPeriod(5, 220, 0),
    ];
    const sum = LoanPeriod.sumPeriods(periods);

    expect(sum.interestPaid).toEqual(125);
    expect(sum.principalPaid).toEqual(1000);
    expect(sum.endingPrincipal).toEqual(0);
  });
});
