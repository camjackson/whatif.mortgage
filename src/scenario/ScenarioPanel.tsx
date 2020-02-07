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

type Props = {
  index: number;
  baseScenario: BaseScenario;
  baseScenarioMonthlyRepayments: number;
  baseScenarioStats: SummaryStats;
  scenario: Scenario;
  setValue: (key: ScenarioKey) => (event) => void;
  addFieldToScenario: (key: ScenarioKey) => void;
  removeFieldFromScenario: (key: ScenarioKey) => void;
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
  addFieldToScenario,
  removeFieldFromScenario,
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
    <section className="panel py-2 px-2 grid panel-narrow lg:panel-medium 2xl:panel-wide text-l font-hairline">
      <ScenarioHeader index={index} removeScenario={removeScenario} />
      {index === 0 ? (
        <div style={{ gridArea: 'form' }} className="text-center italic">
          (Base scenario)
        </div>
      ) : (
        <ScenarioInputs
          index={index}
          scenario={scenario}
          addFieldToScenario={addFieldToScenario}
          removeFieldFromScenario={removeFieldFromScenario}
          setValue={setValue}
        />
      )}
      <RepaymentsStats
        monthlyRepayments={monthlyRepayments}
        stats={stats}
        baseScenarioMonthlyRepayments={baseScenarioMonthlyRepayments}
        baseScenarioStats={baseScenarioStats}
      />
      <RepaymentsGraph
        years={years}
        initialOffsetAmount={appliedScenario.constantOffsetAmount}
        monthlyOffsetIncrement={appliedScenario.monthlyOffsetIncrement}
      />
    </section>
  );
};

export default ScenarioPanel;
