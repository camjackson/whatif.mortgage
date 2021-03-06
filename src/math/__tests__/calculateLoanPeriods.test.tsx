import calculateLoanPeriods from '../calculateLoanPeriods';
import { Scenario } from '../../models';

describe('calculateLoanPeriods', () => {
  const scenario: Scenario = {
    loanAmount: 1000,
    annualInterestRate: 3.6,
    loanLengthInYears: 3,
    constantOffsetAmount: 0,
  };
  const { months, years, stats } = calculateLoanPeriods(scenario, 29.2048);

  describe('the monthly stats', () => {
    it('has the initial state as the zeroeth month', () => {
      expect(months[0].interestPaid).toEqual(0);
      expect(months[0].principalPaid).toEqual(0);
      expect(months[0].endingPrincipal).toEqual(1000);
      expect(months[0].totalSavedOffset).toEqual(0);
    });

    it('has all the other months after that', () => {
      expect(months).toHaveLength(37);

      expect(months[1].interestPaid).toEqual(3);
      expect(months[1].principalPaid).toBeCloseTo(26.2048);
      expect(months[1].endingPrincipal).toBeCloseTo(973.7952);
      expect(months[1].totalSavedOffset).toEqual(0);

      expect(months[2].interestPaid).toBeCloseTo(2.9214);
      expect(months[2].principalPaid).toBeCloseTo(26.2834);
      expect(months[2].endingPrincipal).toBeCloseTo(947.5118);
      expect(months[2].totalSavedOffset).toEqual(0);
    });
  });

  describe('the yearly stats', () => {
    it('reduces the months down to years', () => {
      expect(years).toHaveLength(3);

      expect(years[0].interestPaid).toBeCloseTo(30.7592);
      expect(years[0].principalPaid).toBeCloseTo(319.6984);
      expect(years[0].endingPrincipal).toBeCloseTo(680.3016);
      expect(years[0].totalSavedOffset).toEqual(0);
    });
  });

  describe('the summary stats', () => {
    it('adds up the total interest paid and the total P&I paid', () => {
      expect(stats.totalInterestPaid).toBeCloseTo(56.7465);
      expect(stats.totalAmountPaid).toBeCloseTo(1051.3728);
      expect(stats.interestToPrincipalRatio).toBeCloseTo(5.6747);
      expect(stats.monthsFinishedEarly).toEqual(0);
    });
  });

  describe('with an offset account', () => {
    const offsetScenario: Scenario = {
      loanAmount: 1000,
      annualInterestRate: 3.6,
      loanLengthInYears: 3,
      constantOffsetAmount: 100,
    };
    const { months, stats } = calculateLoanPeriods(offsetScenario, 30);

    it('reduces interest paid and increases principal paid in each month', () => {
      expect(months).toHaveLength(37);

      expect(months[0].totalSavedOffset).toEqual(100);

      expect(months[1].interestPaid).toBeCloseTo(2.7);
      expect(months[1].principalPaid).toBeCloseTo(27.3);
      expect(months[1].endingPrincipal).toBeCloseTo(972.7);
      expect(months[1].totalSavedOffset).toEqual(100);

      expect(months[2].interestPaid).toBeCloseTo(2.6181);
      expect(months[2].principalPaid).toBeCloseTo(27.3819);
      expect(months[2].endingPrincipal).toBeCloseTo(945.3181);
      expect(months[2].totalSavedOffset).toEqual(100);
    });

    it('counts the number of months early the loan was finished', () => {
      expect(stats.monthsFinishedEarly).toEqual(1);
    });
  });

  describe('with an increasing offset', () => {
    const offsetScenario: Scenario = {
      loanAmount: 1000,
      annualInterestRate: 3.6,
      loanLengthInYears: 3,
      constantOffsetAmount: 100,
      monthlyOffsetIncrement: 50,
    };
    const { months } = calculateLoanPeriods(offsetScenario, 30);

    it('reduces interest paid and increases principal paid in each month', () => {
      expect(months).toHaveLength(37);

      expect(months[0].totalSavedOffset).toEqual(100);

      expect(months[1].interestPaid).toEqual(2.55);
      expect(months[1].principalPaid).toEqual(27.45);
      expect(months[1].endingPrincipal).toEqual(972.55);
      expect(months[1].totalSavedOffset).toEqual(150);

      expect(months[2].interestPaid).toEqual(2.31765);
      expect(months[2].principalPaid).toEqual(27.68235);
      expect(months[2].endingPrincipal).toBeCloseTo(944.86765);
      expect(months[2].totalSavedOffset).toEqual(200);

      expect(months[3].interestPaid).toBeCloseTo(2.08460295);
      expect(months[3].principalPaid).toBeCloseTo(27.91539705);
      expect(months[3].endingPrincipal).toBeCloseTo(916.95225295);
      expect(months[3].totalSavedOffset).toEqual(250);
    });
  });
});
