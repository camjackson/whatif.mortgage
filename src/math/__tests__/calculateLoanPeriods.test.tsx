import calculateLoanPeriods from '../calculateLoanPeriods';
import { Scenario } from '../../models';

describe('calculateLoanPeriods', () => {
  const scenario: Scenario = {
    loanAmount: 1000,
    annualInterestRate: 3.6,
    loanLengthInYears: 3,
    constantOffsetAmount: 0,
  };
  const { months, years, stats } = calculateLoanPeriods(scenario, 30);

  describe('the monthly stats', () => {
    it('has the initial state as the zeroeth month', () => {
      expect(months[0].interestPaid).toEqual(0);
      expect(months[0].principalPaid).toEqual(0);
      expect(months[0].endingPrincipal).toEqual(1000);
    });

    it('has all the other months after that', () => {
      expect(months).toHaveLength(37);

      expect(months[1].interestPaid).toEqual(3);
      expect(months[1].principalPaid).toEqual(27);
      expect(months[1].endingPrincipal).toEqual(973);

      expect(months[2].interestPaid).toBeCloseTo(2.919);
      expect(months[2].principalPaid).toEqual(27.081);
      expect(months[2].endingPrincipal).toEqual(945.919);

      // I think 2 months is enough...
    });
  });

  describe('the yearly stats', () => {
    it('reduces the months down to years', () => {
      expect(years).toHaveLength(3);

      expect(years[0].interestPaid).toBeCloseTo(30.6);
      expect(years[0].principalPaid).toBeCloseTo(329.4);
      expect(years[0].endingPrincipal).toBeCloseTo(670.6);
    });
  });

  describe('the summary stats', () => {
    it('adds up the total interest paid and the total P&I paid', () => {
      expect(stats.totalInterestPaid).toBeCloseTo(55.19);
      expect(stats.totalAmountPaid).toEqual(1080);
      expect(stats.interestToPrincipalRatio).toBeCloseTo(5.519);
      // The numbers are a bit off because we used a nice round number for
      // the repayment figure up the top.
    });
  });

  describe('with an offset account', () => {
    const offsetScenario: Scenario = {
      loanAmount: 1000,
      annualInterestRate: 3.6,
      loanLengthInYears: 3,
      constantOffsetAmount: 100,
    };
    const { months, years, stats } = calculateLoanPeriods(offsetScenario, 30);

    it('reduces interest paid and increases principal paid in each month', () => {
      expect(months).toHaveLength(37);

      expect(months[1].interestPaid).toBeCloseTo(2.7);
      expect(months[1].principalPaid).toBeCloseTo(27.3);
      expect(months[1].endingPrincipal).toBeCloseTo(972.7);

      expect(months[2].interestPaid).toBeCloseTo(2.6181);
      expect(months[2].principalPaid).toBeCloseTo(27.3819);
      expect(months[2].endingPrincipal).toBeCloseTo(945.3181);

      // I think 2 months is enough...
    });
  });
});
