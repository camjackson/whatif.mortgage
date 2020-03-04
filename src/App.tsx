import React, { useState, useEffect } from 'react';
import Header from './header/Header';
import AddScenarioButton from './AddScenarioButton';
import ScenarioPanel from './scenario/ScenarioPanel';
import StateStorage, { defaultState, State } from './StateStorage';
import { ScenarioKey } from './models';
import calculateLoanPeriods from './math/calculateLoanPeriods';
import calculateRepayment from './math/calculateRepayment';

const stateStorage = new StateStorage(window.localStorage);
const initialState: State = stateStorage.getFromStorage();

const stripKey = (obj: any, key: string) => {
  const { [key]: _, ...rest } = obj;
  return rest;
};

type StateHook = [State, (newValue: State) => void];

const App = () => {
  const [state, setState]: StateHook = useState(initialState);

  const reset = () => setState(defaultState);

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
  const removeScenario = (index: number) =>
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

  const newFieldInitialValues = {
    [ScenarioKey.annualInterestRate]: state.baseScenario.annualInterestRate,
    [ScenarioKey.constantOffsetAmount]: 0,
    [ScenarioKey.monthlyOffsetIncrement]: 0,
    [ScenarioKey.monthlyRepayment]: baseScenarioMonthlyRepayments,
    [ScenarioKey.loanAmount]: state.baseScenario.loanAmount,
    [ScenarioKey.loanLengthInYears]: state.baseScenario.loanLengthInYears,
  };
  const addFieldToScenario = (index: number) => (fieldKey: ScenarioKey) => {
    const initialValue = newFieldInitialValues[fieldKey];
    setScenarioValue(index)(fieldKey)({ target: { value: `${initialValue}` } });
  };
  const removeFieldFromScenario = (index: number) => (
    fieldKey: ScenarioKey,
  ) => {
    const newScenarios = state.scenarios.map((scenario, i) =>
      index === i ? stripKey(scenario, fieldKey) : scenario,
    );
    setState({ ...state, scenarios: newScenarios });
  };

  return (
    <>
      <Header
        baseScenario={state.baseScenario}
        setValue={setBaseScenarioValue}
        reset={reset}
      />
      <main className="grid py-2 cols-100 sm:cols-50-50">
        {state.scenarios.map((scenario, index) => (
          <ScenarioPanel
            key={index}
            index={index}
            baseScenario={state.baseScenario}
            baseScenarioMonthlyRepayments={baseScenarioMonthlyRepayments}
            baseScenarioStats={baseScenarioStats}
            scenario={scenario}
            setValue={setScenarioValue(index)}
            addFieldToScenario={addFieldToScenario(index)}
            removeFieldFromScenario={removeFieldFromScenario(index)}
            removeScenario={removeScenario}
          />
        ))}
        <AddScenarioButton addScenario={addScenario} />
      </main>
    </>
  );
};

export default App;
