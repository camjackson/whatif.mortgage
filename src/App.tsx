import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import Inputs from './Inputs';
import ScenarioPanel from './ScenarioPanel';
import { BaseScenario, Scenario, ScenarioKey } from './models';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    /* 1rem = 10px (assuming browser has font-size: 16px; ) */
    font-size: 62.5%;
  }

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
  margin: 2rem auto;
  padding: 1rem 2rem;
  font-size: 2.5rem;
  border-radius: 0.2rem;
  border: 0;
  background-color: #8787e6;
  color: black;
  :hover {
    background-color: #3636cc;
    color: white;
    cursor: pointer;
  }
`;

const initialBaseScenario: BaseScenario = (() => {
  try {
    const parsed = JSON.parse(localStorage.getItem('baseScenario') || '');
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

type BaseScenarioStateHook = [BaseScenario, (BaseScenario) => void];
type ScenariosStateHook = [Scenario[], (newValues: Scenario[]) => void];

const App = () => {
  const [baseScenario, setBaseScenario]: BaseScenarioStateHook = useState(
    initialBaseScenario,
  );
  const setBaseScenarioValue = (key: ScenarioKey) => event => {
    setBaseScenario({ ...baseScenario, [key]: event.target.value });
  };

  const [scenarios, setScenarios]: ScenariosStateHook = useState([{}]);
  const addScenario = () => setScenarios([...scenarios, {}]);
  const setScenarioValue = (index: number) => (key: ScenarioKey) => event => {
    setScenarios(
      scenarios.map((scenario, i) =>
        index === i ? { ...scenario, [key]: event.target.value } : scenario,
      ),
    );
  };

  useEffect(() => {
    localStorage.setItem('baseScenario', JSON.stringify(baseScenario));
  }, [baseScenario]);

  return (
    <>
      <GlobalStyles />
      <Inputs {...baseScenario} setValue={setBaseScenarioValue} />
      {scenarios.map((scenario, index) => (
        <ScenarioPanel
          key={index}
          hideInputs={index === 0}
          baseScenario={baseScenario}
          scenario={scenario}
          setValue={setScenarioValue(index)}
        />
      ))}
      <Button onClick={addScenario}>What if...</Button>
    </>
  );
};

export default App;
