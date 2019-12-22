import { BaseScenario, Scenario } from './models';

export type State = {
  baseScenario: BaseScenario;
  scenarios: Scenario[];
};

const STORAGE_KEY = 'persistedState';
export const defaultState = {
  baseScenario: {
    loanAmount: 500000,
    annualInterestRate: 4.99,
    loanLengthInYears: 30,
  },
  scenarios: [{}],
};

export default class StateStorage {
  constructor(private storage: Storage) {}

  public getFromStorage(): State {
    try {
      const state = JSON.parse(this.storage.getItem(STORAGE_KEY) || '');
      if (this.stateLooksOk(state)) {
        return state;
      }
    } catch (e) {}
    return defaultState;
  }

  public persistToStorage(state: State) {
    this.storage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  private stateLooksOk = ({ baseScenario, scenarios }) =>
    baseScenario.loanAmount &&
    baseScenario.annualInterestRate &&
    baseScenario.loanLengthInYears &&
    Array.isArray(scenarios);
}
