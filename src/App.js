import React, { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import InitialInput from './InitialInput';
import NormalApp from './NormalApp';

const GlobalStyles = createGlobalStyle`
  html, body, #root {
    height: 100%
    border: 0;
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
`;

const cachedInitialValues = (() => {
  try {
    const parsed = JSON.parse(localStorage.getItem('values'));
    if (
      parsed.loanAmount &&
      parsed.annualInterestRate &&
      parsed.loanLengthInYears
    ) {
      return parsed;
    }
  } catch (e) {}
  return null;
})();
const initialValues = cachedInitialValues
  ? cachedInitialValues
  : {
      loanAmount: 500000,
      annualInterestRate: 4.99,
      loanLengthInYears: 30,
    };

const App = () => {
  const [isInitialInput, setIsInitialInput] = useState(!cachedInitialValues);
  const finishInitialInput = () => setIsInitialInput(false);

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
      {isInitialInput ? (
        <InitialInput
          {...values}
          setValue={setValue}
          finishInitialInput={finishInitialInput}
        />
      ) : (
        <NormalApp {...values} setValue={setValue} />
      )}
    </>
  );
};

export default App;
