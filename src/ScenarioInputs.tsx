import React, { FC } from 'react';
import styled from 'styled-components';
import { Scenario, ScenarioKey } from './models';

const Form = styled.form`
  grid-area: form;
`;

type Props = {
  scenario: Scenario;
  setValue: (key: ScenarioKey) => (event) => void;
};

const ScenarioInputs: FC<Props> = ({ scenario, setValue }) => (
  <Form>
    <label>
      New interest rate:{' '}
      <input
        type="number"
        min={0.01}
        max={99.99}
        step={0.01}
        value={scenario.annualInterestRate}
        onChange={setValue(ScenarioKey.annualInterestRate)}
      />
    </label>
  </Form>
);

export default ScenarioInputs;
