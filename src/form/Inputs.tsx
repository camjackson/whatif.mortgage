import React from 'react';

const NumberInput = props => (
  <input
    className="border-b-2 border-gray-700 bg-transparent"
    type="number"
    {...props}
  />
);

const getLoanAmountStep = (loanAmount: number): number =>
  Math.max(Math.pow(10, Math.floor(Math.log10(loanAmount)) - 1), 1);

export const LoanAmountInput = ({ style = {}, ...props }) => (
  <NumberInput
    min="0"
    max="10000000"
    step={getLoanAmountStep(props.value)}
    formNoValidate
    style={{ width: '7ch', ...style }}
    {...props}
  />
);
export const InterestRateInput = ({ style = {}, ...props }) => (
  <NumberInput
    min="0.01"
    max="99"
    step="0.01"
    style={{ width: '5ch', textAlign: 'right', ...style }}
    {...props}
  />
);
export const YearsInput = ({ style = {}, ...props }) => (
  <NumberInput
    min="1"
    max="99"
    step="1"
    style={{ width: '2.5ch', ...style }}
    {...props}
  />
);
