import React, { FC } from 'react';
import ScenarioInputs from './ScenarioInputs';
import RepaymentsGraph from './graph/RepaymentsGraph';
import RepaymentsStats from './RepaymentsStats';
import calculateLoanPeriods from './math/calculateLoanPeriods';
import realCalculateRepayment from './math/calculateRepayment';
import { BaseScenario, Scenario, ScenarioKey } from './models';

const gridAreas = {
  gridTemplateAreas: `
    'form graph'
    'stats graph'
  `,
};

type Props = {
  hideInputs: boolean;
  baseScenario: BaseScenario;
  scenario: Scenario;
  setValue: (key: ScenarioKey) => (event) => void;
  calculateRepayment?: (p: number, r: number, n: number) => number;
};

const ScenarioPanel: FC<Props> = ({
  hideInputs,
  baseScenario,
  scenario,
  setValue,
  calculateRepayment = realCalculateRepayment,
}) => {
  const { loanAmount, annualInterestRate, loanLengthInYears }: Scenario = {
    ...baseScenario,
    ...scenario,
  };

  const monthlyRepayments: number = calculateRepayment(
    loanAmount,
    annualInterestRate / 100 / 12,
    loanLengthInYears * 12,
  );

  const { years, stats } = calculateLoanPeriods(
    loanAmount,
    annualInterestRate,
    loanLengthInYears,
    monthlyRepayments,
  );
  return (
    <section
      style={gridAreas}
      className="my-8 grid items-center justify-items-center"
    >
      {hideInputs ? (
        <div style={{ gridArea: 'form' }} />
      ) : (
        <ScenarioInputs scenario={scenario} setValue={setValue} />
      )}
      <RepaymentsStats monthlyRepayments={monthlyRepayments} stats={stats} />
      <RepaymentsGraph years={years} loanAmount={loanAmount} />
    </section>
  );
};

export default ScenarioPanel;
