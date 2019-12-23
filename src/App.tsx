import React, { useState, useEffect } from 'react';
import Header from './Header';
import ScenarioPanel from './scenario/ScenarioPanel';
import StateStorage, { State } from './StateStorage';
import { ScenarioKey } from './models';

const stateStorage = new StateStorage(window.localStorage);
const initialState: State = stateStorage.getFromStorage();

type StateHook = [State, (newValue: State) => void];

const App = () => {
  const [state, setState]: StateHook = useState(initialState);

  const setBaseScenarioValue = (key: ScenarioKey) => event => {
    setState({
      ...state,
      baseScenario: { ...state.baseScenario, [key]: event.target.value },
    });
  };
  const setScenarioValue = (index: number) => (key: ScenarioKey) => event => {
    setState({
      ...state,
      scenarios: state.scenarios.map((scenario, i) =>
        index === i ? { ...scenario, [key]: event.target.value } : scenario,
      ),
    });
  };
  const addScenario = () =>
    setState({ ...state, scenarios: [...state.scenarios, {}] });

  useEffect(() => stateStorage.persistToStorage(state), [state]);

  return (
    <>
      <Header
        baseScenario={state.baseScenario}
        setValue={setBaseScenarioValue}
      />
      {state.scenarios.map((scenario, index) => (
        <ScenarioPanel
          key={index}
          hideInputs={index === 0}
          baseScenario={state.baseScenario}
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
