import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
  font-size: 40px;
`;

const NumberInput = styled.input.attrs({
  type: 'number',
})`
  border: 0;
  border-bottom: 2px solid grey;
  font-size: inherit;
`;

const Inputs = ({
  loanAmount,
  annualInterestRate,
  loanLengthInYears,
  setValue,
}) => (
  <Form>
    I will borrow $
    <NumberInput
      min="0"
      max="10000000"
      step="1"
      style={{ width: 160 }}
      value={loanAmount}
      onChange={setValue('loanAmount')}
    />
    at{' '}
    <NumberInput
      min="0"
      max="99"
      step="0.01"
      style={{ width: 100, textAlign: 'right' }}
      value={annualInterestRate}
      onChange={setValue('annualInterestRate')}
    />{' '}
    %p.a., over{' '}
    <NumberInput
      min="0"
      max="99"
      step="1"
      style={{ width: 60 }}
      value={loanLengthInYears}
      onChange={setValue('loanLengthInYears')}
    />{' '}
    years
  </Form>
);

export default Inputs;
