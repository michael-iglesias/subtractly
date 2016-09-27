import assert from 'assert';
import { createStore } from 'redux';
import ReduxGatorade from '../src/index';

let reducer = (state = {}, action) => {
  switch (action.type) {
    case ReduxGatorade.HydrationConstants.HYDRATE_STATE:
      return Object.assign({}, state, {
        urlParameters: action.payload
      });
    default:
      return {};
  }
};

describe('HydrationReducer Tests', () => {
  let wrappedReducer;

  beforeEach(() => {
    wrappedReducer = ReduxGatorade.HydrationReducer(reducer);
  });

  it('should correctly set { urlParameters: {} } when hydrateFromUrlParams(params :: obj) is invoked', () => {
    const params = {
      foo: 'bar',
      baz: 'asdf'
    };

    assert({
      urlParameters: {
        foo: 'bar',
        baz: 'asdf'
      }
    }, reducer(undefined, ReduxGatorade.HydrationActions.hydrateFromUrlParams(params)));
  });

  it('should return an initial state when a redux store is created', () => {
    let store = createStore(wrappedReducer);

    assert.deepEqual(
      store.getState(),
      reducer(undefined, {}));
  });
});
