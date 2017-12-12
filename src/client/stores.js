import { createStore, compose, applyMiddleware, bindActionCreators } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import reducers from './reducers';

export function configureStore(history, initialState) {
  const isNotProduction = process.env.NODE_ENV !== 'production';
  const isFrontend = typeof window !== 'undefined' && window.document;

  const middlewares = [routerMiddleware(history), thunk];

  let composeEnhancers = compose;
  if (isNotProduction && isFrontend) {
    middlewares.push(logger);
    // add redux devtools support in browser
    // eslint-disable-next-line no-underscore-dangle
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }

  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  return store;
}

export function bindActions(actions) {
  return dispatch => ({
    actions: { ...bindActionCreators(actions, dispatch) },
  });
}

export function mapStateToProps(key) {
  return state => ({ store: state && state[key] ? state[key] : null });
}
