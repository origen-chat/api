import { applyMiddleware, createStore, Middleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';

import { isDevelopmentEnvironment } from '../helpers';
import { Actions, ReduxState, rootReducer, rootSaga } from '../modules';

export type ReduxStore = Store<ReduxState, Actions>;

export type CreateReduxStoreArgs = Readonly<{
  initialState?: any;
}>;

export function createReduxStore(args: CreateReduxStoreArgs = {}): ReduxStore {
  const [middleware, sagaMiddleware] = getMiddleware();

  const enhancer = composeWithDevTools(applyMiddleware(...middleware));

  const store = createStore(rootReducer, args.initialState, enhancer);

  sagaMiddleware.run(rootSaga);

  hotReloadReducers(store);

  return store;
}

function getMiddleware(): [ReadonlyArray<Middleware>, SagaMiddleware<any>] {
  const sagaMiddleware = createSagaMiddleware();

  let middleware: ReadonlyArray<Middleware> = [sagaMiddleware];

  if (isDevelopmentEnvironment) {
    const devMiddleware = getDevMiddleware();

    middleware = [...middleware, ...devMiddleware];
  }

  return [middleware, sagaMiddleware];
}

function getDevMiddleware(): ReadonlyArray<Middleware> {
  /* eslint-disable global-require */
  const { createLogger: createLoggerMiddleware } = require('redux-logger');
  const {
    default: createImmutableStateInvariantMiddleware,
  } = require('redux-immutable-state-invariant');
  /* eslint-enable global-require */

  const immutableStateInvariantMiddleware = createImmutableStateInvariantMiddleware();
  const loggerMiddleware = createLoggerMiddleware();

  const middleware = [immutableStateInvariantMiddleware, loggerMiddleware];

  return middleware;
}

function hotReloadReducers(store: ReduxStore): void {
  if (isDevelopmentEnvironment && (module as any).hot) {
    (module as any).hot.accept('../modules/rootReducer', () =>
      store.replaceReducer(rootReducer),
    );
  }
}
