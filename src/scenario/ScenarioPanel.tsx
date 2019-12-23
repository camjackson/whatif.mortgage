import React, { FC } from 'react';
import ScenarioInputs from './ScenarioInputs';
import RepaymentsGraph from './graph/RepaymentsGraph';
import RepaymentsStats from './RepaymentsStats';
import calculateLoanPeriods from '../math/calculateLoanPeriods';
import realCalculateRepayment from '../math/calculateRepayment';
import { BaseScenario, Scenario, ScenarioKey } from '../models';

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
  const appliedScenario: Scenario = { ...baseScenario, ...scenario };
  const { loanAmount, annualInterestRate, loanLengthInYears } = appliedScenario;

  const monthlyRepayments: number = calculateRepayment(
    loanAmount,
    annualInterestRate / 100 / 12,
    loanLengthInYears * 12,
  );

  const { years, stats } = calculateLoanPeriods(
    appliedScenario,
    monthlyRepayments,
  );
  return (
    <section
      style={gridAreas}
      className="my-8 grid items-center justify-items-center text-2xl font-hairline"
    >
      {hideInputs ? (
        <div style={{ gridArea: 'form' }} />
      ) : (
        <ScenarioInputs
          baseScenario={baseScenario}
          scenario={scenario}
          setValue={setValue}
        />
      )}
      <RepaymentsStats monthlyRepayments={monthlyRepayments} stats={stats} />
      <RepaymentsGraph years={years} />
    </section>
  );
};

export default ScenarioPanel;
