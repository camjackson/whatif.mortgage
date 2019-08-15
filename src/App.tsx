import React, { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import Inputs from './Inputs';
import RepaymentsData from './RepaymentsData';

const GlobalStyles = createGlobalStyle`
  html, body, #root {
    height: 100%
    border: 0;
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
`;

const initialValues = (() => {
  try {
    const parsed = JSON.parse(localStorage.getItem('values') || '');
    if (
      parsed.loanAmount &&
      parsed.annualInterestRate &&
      parsed.loanLengthInYears
    ) {
      return parsed;
    }
  } catch (e) {}

  return {
    loanAmount: 500000,
    annualInterestRate: 4.99,
    loanLengthInYears: 30,
  };
})();

const calculateRepayment = (p, r, n) => {
  const onePlusRToTheN = Math.pow(1 + r, n);
  const numerator = r * onePlusRToTheN;
  const denominator = onePlusRToTheN - 1;

  return p * (numerator / denominator);
};

const App = () => {
  const [values, setValues] = useState(initialValues);
  const setValue = key => event => {
    setValues({ ...values, [key]: event.target.value });
  };

  useEffect(() => {
    localStorage.setItem('values', JSON.stringify(values));
  }, [values]);

  const monthlyRepayments = calculateRepayment(
    values.loanAmount,
    values.annualInterestRate / 100 / 12,
    values.loanLengthInYears * 12,
  );

  return (
    <>
      <GlobalStyles />
      <Inputs {...values} setValue={setValue} />
      <RepaymentsData
        loanAmount={values.loanAmount}
        annualInterestRate={values.annualInterestRate}
        loanLengthInYears={values.loanLengthInYears}
        monthlyRepayments={monthlyRepayments}
      />
    </>
  );
};

export default App;
