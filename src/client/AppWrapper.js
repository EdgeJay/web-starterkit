import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AsyncComponentProvider } from 'react-async-component';
import asyncBootstrapper from 'react-async-bootstrapper';
import { configureStore } from './stores';
import renderRoutes from './utils/renderRoutes';
import App from './App';

// eslint-disable-next-line dot-notation
const store = configureStore(browserHistory, window['__preload__']);
// eslint-disable-next-line dot-notation
const asyncState = window['__asyncState__'];
const history = syncHistoryWithStore(browserHistory, store);
const routes = renderRoutes();

const render = () => {
  // wrap app with AsyncComponentProvider to rehydrate state
  // (refer to renderContent method in LandingController)
  const WrappedApp = (
    <AsyncComponentProvider rehydrateState={asyncState}>
      <App
        store={store}
        history={history}
        routes={routes}
      />
    </AsyncComponentProvider>
  );

  asyncBootstrapper(WrappedApp).then(() => {
    // render the app
    ReactDOM.hydrate(
      WrappedApp,
      document.getElementById('mount'),
    );
  });
};

render();

if (module.hot) {
  module.hot.accept('./utils/renderRoutes', () => render());
}
