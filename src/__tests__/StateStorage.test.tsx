import StateStorage, { defaultState } from '../StateStorage';
import { BaseScenario, Scenario } from '../models';

describe('StateStorage', () => {
  const createMockStorage = persistedState => ({
    getItem: key => (key === 'persistedState' ? persistedState : null),
    setItem: jest.fn(),
  });

  describe('getFromStorage', () => {
    it('can get the state from the storate', () => {
      const baseScenarioJson =
        '{"loanAmount":100,"annualInterestRate":2.3,"loanLengthInYears":5}';
      const scenariosJson =
        '[{"annualInterestRate":2},{"annualInterestRate":4}]';
      const storage = createMockStorage(
        `{"baseScenario":${baseScenarioJson},"scenarios":${scenariosJson}}`,
      );
      const stateStorage = new StateStorage(storage);

      expect(stateStorage.getFromStorage()).toEqual({
        baseScenario: {
          loanAmount: 100,
          annualInterestRate: 2.3,
          loanLengthInYears: 5,
        },
        scenarios: [{ annualInterestRate: 2 }, { annualInterestRate: 4 }],
      });
    });

    it('returns a default state if nothing is stored', () => {
      const storage = createMockStorage(null);
      const stateStorage = new StateStorage(storage);

      expect(stateStorage.getFromStorage()).toEqual(defaultState);
    });

    it('returns a default state if the persisted state is invalid JSON', () => {
      const storage = createMockStorage("Oh hey what's up");
      const stateStorage = new StateStorage(storage);

      expect(stateStorage.getFromStorage()).toEqual(defaultState);
    });

    it('returns a default state if the persisted state is the wrong shape of JSON', () => {
      const storage = createMockStorage('{"foo": 1, "bar": 2}');
      const stateStorage = new StateStorage(storage);

      expect(stateStorage.getFromStorage()).toEqual(defaultState);
    });
  });

  describe('persistToStorage', () => {
    it('persists the state', () => {
      const storage = createMockStorage(null);
      const stateStorage = new StateStorage(storage);

      stateStorage.persistToStorage({
        baseScenario: {
          loanAmount: 200,
          annualInterestRate: 3.4,
          loanLengthInYears: 5,
        },
        scenarios: [{ annualInterestRate: 1.2 }, { annualInterestRate: 3.4 }],
      });

      const baseScenarioJson =
        '{"loanAmount":200,"annualInterestRate":3.4,"loanLengthInYears":5}';
      const scenariosJson =
        '[{"annualInterestRate":1.2},{"annualInterestRate":3.4}]';
      expect(storage.setItem).toHaveBeenCalledWith(
        'persistedState',
        `{"baseScenario":${baseScenarioJson},"scenarios":${scenariosJson}}`,
      );
    });
  });
});
