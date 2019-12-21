export type BaseScenario = {
  loanAmount: number;
  annualInterestRate: number;
  loanLengthInYears: number;
};

export type Scenario = {
  loanAmount?: number;
  annualInterestRate?: number;
  loanLengthInYears?: number;
  // more to come!
};

export enum ScenarioKey {
  loanAmount = 'loanAmount',
  annualInterestRate = 'annualInterestRate',
  loanLengthInYears = 'loanLengthInYears',
}