import React, { useState, useEffect } from 'react';
import Header from './Header';
import ScenarioPanel from './ScenarioPanel';
import StateStorage, { State } from './StateStorage';
import { BaseScenario, Scenario, ScenarioKey } from './models';

const stateStorage = new StateStorage(window.localStorage);
const initialState: State = stateStorage.getFromStorage();

type BaseScenarioStateHook = [BaseScenario, (BaseScenario) => void];
type ScenariosStateHook = [Scenario[], (newValues: Scenario[]) => void];

const App = () => {
  const [baseScenario, setBaseScenario]: BaseScenarioStateHook = useState(
    initialState.baseScenario,
  );
  const setBaseScenarioValue = (key: ScenarioKey) => event => {
    setBaseScenario({ ...baseScenario, [key]: event.target.value });
  };

  const [scenarios, setScenarios]: ScenariosStateHook = useState(
    initialState.scenarios,
  );
  const addScenario = () => setScenarios([...scenarios, {}]);
  const setScenarioValue = (index: number) => (key: ScenarioKey) => event => {
    setScenarios(
      scenarios.map((scenario, i) =>
        index === i ? { ...scenario, [key]: event.target.value } : scenario,
      ),
    );
  };

  useEffect(() => stateStorage.persistToStorage({ baseScenario, scenarios }), [
    baseScenario,
    scenarios,
  ]);

  return (
    <>
      <Header {...baseScenario} setValue={setBaseScenarioValue} />
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
