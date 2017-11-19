import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { configureStore } from './stores';
import renderRoutes from './utils/renderRoutes';
import App from './App';

const render = () => {
  // eslint-disable-next-line dot-notation
  const store = configureStore(browserHistory, window['__preload__']);
  const history = syncHistoryWithStore(browserHistory, store);

  ReactDOM.hydrate(
    <App
      store={store}
      history={history}
      routes={renderRoutes()}
    />,
    document.getElementById('mount'));
};

render();

if (module.hot) {
  module.hot.accept('./utils/renderRoutes', () => render());
}
