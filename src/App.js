import React, { useState } from 'react';
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

const App = () => {
  const [isInitialInput, setIsInitialInput] = useState(true);
  const finishInitialInput = () => setIsInitialInput(false);

  const [values, setValues] = useState({
    loanAmount: 500000,
    annualInterestRate: 4.99,
    loanLengthInYears: 30,
  });
  const setValue = key => event => {
    setValues({ ...values, [key]: event.target.value });
  };

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
