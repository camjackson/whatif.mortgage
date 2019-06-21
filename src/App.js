import React, { useState } from 'react';
import Params from './Params';
import Graph from './Graph';

const App = () => {
  const [loanAmount, setLoanAmount] = useState(50000);
  const [annualInterestRate, setAnnualInterestRate] = useState(4);
  const [loanLengthInYears, setLoanLengthInYears] = useState(30);
  const [monthlyRepayments, setMonthlyRepayments] = useState(2500);

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
