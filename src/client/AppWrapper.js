import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { configureStore } from './stores';
import renderRoutes from './routes';
import App from './App';

// eslint-disable-next-line dot-notation
const store = configureStore(browserHistory, window['__preload__']);
const history = syncHistoryWithStore(browserHistory, store);
const routes = renderRoutes();

const render = () => {
  ReactDOM.hydrate(
    <App store={store} history={history} routes={routes} />,
    document.getElementById('mount'));
};

render();

if (module.hot) {
  module.hot.accept('./routes', () => render());
}
