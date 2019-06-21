import React, { useState } from 'react';
import Params from './Params';
import Graph from './Graph';

const calculateRepayment = (p, r, n) => {
  const onePlusRToTheN = Math.pow(1 + r, n);
  const numerator = r * onePlusRToTheN;
  const denominator = onePlusRToTheN - 1;

  return p * (numerator / denominator);
};

const App = () => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [annualInterestRate, setAnnualInterestRate] = useState(3.6);
  const [loanLengthInYears, setLoanLengthInYears] = useState(30);
  const [monthlyRepayments, setMonthlyRepayments] = useState(
    calculateRepayment(
      loanAmount,
      annualInterestRate / 100 / 12,
      loanLengthInYears * 12,
    ),
  );

  return (
    <main className="App">
      <Params
        loanAmount={loanAmount}
        annualInterestRate={annualInterestRate}
        loanLengthInYears={loanLengthInYears}
        monthlyRepayments={monthlyRepayments}
        setLoanAmount={setLoanAmount}
        setAnnualInterestRate={setAnnualInterestRate}
        setLoanLengthInYears={setLoanLengthInYears}
        setMonthlyRepayments={setMonthlyRepayments}
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

export default App;
