import { createStore, combineReducers, compose, applyMiddleware, bindActionCreators } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import reducers from './reducers';

export function configureStore(history, initialState) {
  const reducer = combineReducers({
    ...reducers,
    routing: routerReducer,
  });

  const store = createStore(reducer, initialState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
      ),
    ),
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
