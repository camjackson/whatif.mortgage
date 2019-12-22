import React, { FC } from 'react';
import { Scenario, ScenarioKey } from './models';
import Form from './form/Form';
import { LoanAmountInput, InterestRateInput, YearsInput } from './form/Inputs';

type Props = {
  scenario: Scenario;
  setValue: (key: ScenarioKey) => (event) => void;
};

const ScenarioInputs: FC<Props> = ({ scenario, setValue }) => (
  <Form style={{ gridArea: 'form' }}>
    <label>
      New interest rate:{' '}
      <InterestRateInput
        width="4ch"
        value={scenario.annualInterestRate}
        onChange={setValue(ScenarioKey.annualInterestRate)}
      />
      %
    </label>
  </Form>
);

export default ScenarioInputs;
