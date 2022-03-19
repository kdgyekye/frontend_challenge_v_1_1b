import getStore, { appReducer, initialState, appStartAction } from '../getStore';

describe('redux related tests', () => {
  it('reducer should return initial state', () => {
    const state = appReducer(undefined, { type: 'something' });
    expect(state).toEqual(initialState);
  });

  it('reducer should return started state', () => {
    const testAction = appStartAction();
    const expectedState = {
      ...initialState,
      started: true,
    };
    const state = appReducer(initialState, testAction);
    expect(state).toEqual(expectedState);
  });

  it('creates redux store without crashing', () => {
    const store = getStore();
    expect(store.getState).toBeDefined();
    expect(store.dispatch).toBeDefined();
    expect(store.subscribe).toBeDefined();
  });
});
