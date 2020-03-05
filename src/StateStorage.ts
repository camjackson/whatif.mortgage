import { BaseScenario, Scenario } from './models';

export type State = {
  baseScenario: BaseScenario;
  scenarios: Scenario[];
  currencySymbol: string;
};

const STORAGE_KEY = 'persistedState';
export const defaultState: State = {
  baseScenario: {
    loanAmount: 500000,
    annualInterestRate: 4.99,
    loanLengthInYears: 30,
  },
  scenarios: [{}],
  currencySymbol: '$',
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

  public stateLooksOk = ({ baseScenario, scenarios, currencySymbol }) =>
    baseScenario.loanAmount &&
    baseScenario.annualInterestRate &&
    baseScenario.loanLengthInYears &&
    Array.isArray(scenarios) &&
    typeof currencySymbol === 'string';
}
