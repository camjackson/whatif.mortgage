import React, { FC } from 'react';
import ScenarioHeader from './ScenarioHeader';
import ScenarioInputs from './ScenarioInputs';
import RepaymentsGraph from './graph/RepaymentsGraph';
import RepaymentsStats from './RepaymentsStats';
import calculateLoanPeriods from '../math/calculateLoanPeriods';
import realCalculateRepayment from '../math/calculateRepayment';
import { BaseScenario, Scenario, ScenarioKey } from '../models';

const gridAreas = {
  gridTemplateAreas: `
    'header header'
    'form graph'
    'stats graph'
  `,
};

type Props = {
  index: number;
  baseScenario: BaseScenario;
  scenario: Scenario;
  setValue: (key: ScenarioKey) => (event) => void;
  removeScenario: (index: number) => void;
  calculateRepayment?: (p: number, r: number, n: number) => number;
};

const ScenarioPanel: FC<Props> = ({
  index,
  baseScenario,
  scenario,
  setValue,
  removeScenario,
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
      className="panel py-1 px-3 grid cols-30-70 items-center justify-items-center text-xl font-hairline"
    >
      <ScenarioHeader index={index} removeScenario={removeScenario} />
      {index === 0 ? (
        <div style={{ gridArea: 'form' }} className="align-self-end">
          (Base scenario)
        </div>
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
