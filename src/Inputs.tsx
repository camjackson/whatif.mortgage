import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
  font-size: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
`;

const NumberInput = styled.input.attrs({
  type: 'number',
})`
  border: 0;
  border-bottom: 0.2rem solid grey;
  font-size: inherit;
`;

const getLoanAmountStep = loanAmount =>
  Math.pow(10, Math.floor(Math.log10(loanAmount)) - 1);

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
      step={getLoanAmountStep(loanAmount)}
      formNoValidate
      style={{ width: 160 }}
      value={loanAmount}
      onChange={setValue('loanAmount')}
    />
    at{' '}
    <NumberInput
      min="0.01"
      max="99"
      step="0.01"
      style={{ width: 100, textAlign: 'right' }}
      value={annualInterestRate}
      onChange={setValue('annualInterestRate')}
    />{' '}
    %p.a., over{' '}
    <NumberInput
      min="1"
      max="99"
      step="1"
      style={{ width: 60, marginLeft: 10 }}
      value={loanLengthInYears}
      onChange={setValue('loanLengthInYears')}
    />{' '}
    years
  </Form>
);

export default Inputs;
