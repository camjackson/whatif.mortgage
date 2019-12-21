import React from 'react';

const NumberInput = props => (
  <input className="border-b-2 border-gray-700" type="number" {...props} />
);

const getLoanAmountStep = loanAmount =>
  Math.pow(10, Math.floor(Math.log10(loanAmount)) - 1);

const Inputs = ({
  loanAmount,
  annualInterestRate,
  loanLengthInYears,
  setValue,
}) => (
  <form className="flex justify-center items-center my-4 mx-0 text-4xl">
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
  </form>
);

export default Inputs;
