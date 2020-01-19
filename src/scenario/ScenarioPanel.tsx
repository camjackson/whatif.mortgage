import React, { FC } from 'react';
import ScenarioHeader from './ScenarioHeader';
import ScenarioInputs from './ScenarioInputs';
import RepaymentsGraph from './graph/RepaymentsGraph';
import RepaymentsStats from './RepaymentsStats';
import calculateLoanPeriods, {
  SummaryStats,
} from '../math/calculateLoanPeriods';
import realCalculateRepayment from '../math/calculateRepayment';
import { BaseScenario, Scenario, ScenarioKey } from '../models';

const gridAreas = {
  gridTemplateAreas: `
    'form header'
    'form graph'
    'stats graph'
  `,
};

type Props = {
  index: number;
  baseScenario: BaseScenario;
  baseScenarioMonthlyRepayments: number;
  baseScenarioStats: SummaryStats;
  scenario: Scenario;
  setValue: (key: ScenarioKey) => (event) => void;
  removeScenario: (index: number) => void;
  calculateRepayment?: (p: number, r: number, n: number) => number;
};

const ScenarioPanel: FC<Props> = ({
  index,
  baseScenario,
  baseScenarioMonthlyRepayments,
  baseScenarioStats,
  scenario,
  setValue,
  removeScenario,
  calculateRepayment = realCalculateRepayment,
}) => {
  const appliedScenario: Scenario = { ...baseScenario, ...scenario };
  const { loanAmount, annualInterestRate, loanLengthInYears } = appliedScenario;

  const monthlyRepayments: number =
    appliedScenario.monthlyRepayment ||
    calculateRepayment(
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
      className="panel py-1 px-3 grid cols-35-65 items-center justify-items-center text-xl font-hairline"
    >
      <ScenarioHeader index={index} removeScenario={removeScenario} />
      {index === 0 ? (
        <div style={{ gridArea: 'form' }}>(Base scenario)</div>
      ) : (
        <ScenarioInputs
          index={index}
          baseScenario={baseScenario}
          scenario={scenario}
          setValue={setValue}
        />
      )}
      <RepaymentsStats
        monthlyRepayments={monthlyRepayments}
        stats={stats}
        baseScenarioMonthlyRepayments={baseScenarioMonthlyRepayments}
        baseScenarioStats={baseScenarioStats}
      />
      <RepaymentsGraph years={years} />
    </section>
  );
};

export default ScenarioPanel;
