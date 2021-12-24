import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';

import { rootReducer } from '../reducers';
import { Action } from '../actions';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?? compose;

export const configureStore = () => {
  const logger = createLogger({
    collapsed: true,
    predicate: (_, action: Action) => action.type !== 'UPDATE_PASSWORD'
  });
  
  const middleware = [logger, thunk];
  
  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middleware)),
  );
};
  
