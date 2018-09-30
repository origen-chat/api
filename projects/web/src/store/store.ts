import { applyMiddleware, createStore, Middleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';

import { isDevelopmentEnvironment } from '../helpers';
import { rootReducer, rootSaga } from '../modules';

export type CreateReduxStoreArgs = Readonly<{
  initialState?: any;
}>;

export function createReduxStore(args: CreateReduxStoreArgs = {}): Store {
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
  const createImmutableStateInvariantMiddleware = require('redux-immutable-state-invariant');
  /* eslint-enable global-require */

  const immutableStateInvariantMiddleware = createImmutableStateInvariantMiddleware();
  const loggerMiddleware = createLoggerMiddleware();

  const middleware = [immutableStateInvariantMiddleware, loggerMiddleware];

  return middleware;
}

function hotReloadReducers(store: Store): void {
  if (isDevelopmentEnvironment && (module as any).hot) {
    (module as any).hot.accept('../modules/rootReducer', () =>
      store.replaceReducer(rootReducer),
    );
  }
}
