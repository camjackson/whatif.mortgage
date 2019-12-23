export type BaseScenario = {
  loanAmount: number;
  annualInterestRate: number;
  loanLengthInYears: number;
};

export type Scenario = {
  loanAmount?: number;
  annualInterestRate?: number;
  loanLengthInYears?: number;
  constantOffsetAmount?: number;
  monthlyOffsetIncrement?: number;
};

export enum ScenarioKey {
  loanAmount = 'loanAmount',
  annualInterestRate = 'annualInterestRate',
  loanLengthInYears = 'loanLengthInYears',
  constantOffsetAmount = 'constantOffsetAmount',
  monthlyOffsetIncrement = 'monthlyOffsetIncrement',
}
