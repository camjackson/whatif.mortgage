import React from 'react';
import Params from './Params';
import Graph from './Graph';

const calculateRepayment = (p, r, n) => {
  const onePlusRToTheN = Math.pow(1 + r, n);
  const numerator = r * onePlusRToTheN;
  const denominator = onePlusRToTheN - 1;

  return p * (numerator / denominator);
};

const NormalApp = ({
  loanAmount,
  annualInterestRate,
  loanLengthInYears,
  setValue,
}) => {
  const monthlyRepayments = calculateRepayment(
    loanAmount,
    annualInterestRate / 100 / 12,
    loanLengthInYears * 12,
  );

  return (
    <main>
      <Params
        loanAmount={loanAmount}
        annualInterestRate={annualInterestRate}
        loanLengthInYears={loanLengthInYears}
        monthlyRepayments={monthlyRepayments}
        setLoanAmount={setValue('annualInterestRate')}
        setAnnualInterestRate={setValue('loanLengthInYears')}
        setLoanLengthInYears={setValue('monthlyRepayments')}
      />
      <Graph
        loanAmount={loanAmount}
        annualInterestRate={annualInterestRate}
        loanLengthInYears={loanLengthInYears}
        monthlyRepayments={monthlyRepayments}
      />
    </main>
  );
};

export default NormalApp;
