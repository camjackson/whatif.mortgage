import React, { FC } from 'react';
import styled from 'styled-components';
import ScenarioInputs from './ScenarioInputs';
import RepaymentsGraph from './graph/RepaymentsGraph';
import RepaymentsStats from './RepaymentsStats';
import calculateLoanPeriods from './math/calculateLoanPeriods';
import calculateRepayment from './math/calculateRepayment';
import { BaseScenario, Scenario, ScenarioKey } from './models';

const Section = styled.section`
  margin-bottom: 5rem;
  display: grid;
  grid-template-areas:
    'form graph'
    'stats graph';
  justify-items: center;
  align-items: center;
`;

type Props = {
  hideInputs: boolean;
  baseScenario: BaseScenario;
  scenario: Scenario;
  setValue: (key: ScenarioKey) => (event) => void;
};

const ScenarioPanel: FC<Props> = ({
  hideInputs,
  baseScenario,
  scenario,
  setValue,
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
    <Section>
      {!hideInputs && (
        <ScenarioInputs scenario={scenario} setValue={setValue} />
      )}
      <RepaymentsStats monthlyRepayments={monthlyRepayments} stats={stats} />
      <RepaymentsGraph years={years} loanAmount={loanAmount} />
    </Section>
  );
};

export default ScenarioPanel;
