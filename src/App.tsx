import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import Inputs from './Inputs';
import Scenario from './Scenario';

const GlobalStyles = createGlobalStyle`
  html, body, #root {
    height: 100%
    border: 0;
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
`;

const Button = styled.button`
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 25px;
  border-radius: 2px;
  border: 0;
  background-color: #8787e6;
  color: black;
  :hover {
    background-color: #3636cc;
    color: white;
    cursor: pointer;
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

const App = () => {
  const [scenarios, setScenarios] = useState([null]);
  const addScenario = () => setScenarios([...scenarios, null]);

  const [values, setValues] = useState(initialValues);
  const setValue = key => event => {
    setValues({ ...values, [key]: event.target.value });
  };

  useEffect(() => {
    localStorage.setItem('values', JSON.stringify(values));
  }, [values]);

  return (
    <>
      <GlobalStyles />
      <Inputs {...values} setValue={setValue} />
      {scenarios.map((scenario, i) => (
        <Scenario
          key={i}
          loanAmount={values.loanAmount}
          annualInterestRate={values.annualInterestRate}
          loanLengthInYears={values.loanLengthInYears}
        />
      ))}
      <Button onClick={addScenario}>What if...</Button>
    </>
  );
};

export default App;
