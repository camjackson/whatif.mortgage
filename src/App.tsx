import React, { useState, useEffect } from 'react';
import Header from './Header';
import AddScenarioButton from './AddScenarioButton';
import ScenarioPanel from './scenario/ScenarioPanel';
import StateStorage, { State } from './StateStorage';
import { ScenarioKey } from './models';
import calculateLoanPeriods from './math/calculateLoanPeriods';
import calculateRepayment from './math/calculateRepayment';

const stateStorage = new StateStorage(window.localStorage);
const initialState: State = stateStorage.getFromStorage();

type StateHook = [State, (newValue: State) => void];

const App = () => {
  const [state, setState]: StateHook = useState(initialState);

  const setBaseScenarioValue = (key: ScenarioKey) => event => {
    const value = parseFloat(event.target.value);
    const newBaseScenario = { ...state.baseScenario, [key]: value };
    setState({ ...state, baseScenario: newBaseScenario });
  };
  const setScenarioValue = (index: number) => (key: ScenarioKey) => event => {
    const value = parseFloat(event.target.value);
    const newScenarios = state.scenarios.map((scenario, i) =>
      index === i ? { ...scenario, [key]: value } : scenario,
    );
    setState({ ...state, scenarios: newScenarios });
  };
  const addScenario = () =>
    setState({ ...state, scenarios: [...state.scenarios, {}] });
  const removeScenario = index =>
    setState({
      ...state,
      scenarios: state.scenarios.filter((_, i) => i !== index),
    });

  useEffect(() => stateStorage.persistToStorage(state), [state]);

  const baseScenarioMonthlyRepayments = calculateRepayment(
    state.baseScenario.loanAmount,
    state.baseScenario.annualInterestRate / 100 / 12,
    state.baseScenario.loanLengthInYears * 12,
  );
  const { stats: baseScenarioStats } = calculateLoanPeriods(
    state.baseScenario,
    baseScenarioMonthlyRepayments,
  );

  return (
    <>
      <Header
        baseScenario={state.baseScenario}
        setValue={setBaseScenarioValue}
      />
      <main className="grid cols-50-50 py-2 px-4">
        {state.scenarios.map((scenario, index) => (
          <ScenarioPanel
            key={index}
            index={index}
            baseScenario={state.baseScenario}
            baseScenarioMonthlyRepayments={baseScenarioMonthlyRepayments}
            baseScenarioStats={baseScenarioStats}
            scenario={scenario}
            setValue={setScenarioValue(index)}
            removeScenario={removeScenario}
          />
        ))}
        <AddScenarioButton addScenario={addScenario} />
      </main>
    </>
  );
};

export default App;
