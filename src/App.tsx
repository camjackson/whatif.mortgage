import React, { useState, useEffect } from 'react';
import Inputs from './Inputs';
import ScenarioPanel from './ScenarioPanel';
import { BaseScenario, Scenario, ScenarioKey } from './models';

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
      <button
        className="block mx-auto my-4 px-8 py-4 border border-blue-700 rounded-sm text-xl"
        onClick={addScenario}
      >
        What if...
      </button>
    </>
  );
};

export default App;
