import { createStore, combineReducers, compose, applyMiddleware, bindActionCreators } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const initial = {
  main: {
    title: 'Welcome to Web Starter Kit!',
  },
};

export function configureStore(history, initialState) {
  const reducer = combineReducers({
    ...reducers,
    routing: routerReducer,
  });

  const preloadState = Object.keys(initial).reduce((acc, val) => {
    if (!initialState[val]) {
      acc[val] = {
        ...initial[val],
      };
    } else {
      acc[val] = {
        ...initial[val],
        ...initialState[val],
      };
    }

    return acc;
  }, {});

  const store = createStore(
    reducer,
    preloadState,
    compose(applyMiddleware(routerMiddleware(history), thunk))
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
