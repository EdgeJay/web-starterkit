import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import { AsyncComponentProvider } from 'react-async-component';
import asyncBootstrapper from 'react-async-bootstrapper';
import { configureStore } from './stores';
import renderRoutes from './utils/renderRoutes';
import App from './App';

const enableHMR =
  process.env.ENABLE_WEBPACK_HMR === 'true' && process.env.NODE_ENV !== 'production';

// eslint-disable-next-line dot-notation
const store = configureStore(browserHistory, window['__preload__']);
// eslint-disable-next-line dot-notation
const asyncState = window['__asyncState__'];
const history = syncHistoryWithStore(browserHistory, store);
const routes = renderRoutes();

const render = () => {
  // wrap app with AsyncComponentProvider to rehydrate state
  // (refer to renderContent method in LandingController)
  let WrappedApp = (
    <AsyncComponentProvider rehydrateState={asyncState}>
      <App store={store} history={history} routes={routes} />
    </AsyncComponentProvider>
  );

  if (enableHMR) {
    WrappedApp = <AppContainer key={Math.random()}>{WrappedApp}</AppContainer>;
  }

  asyncBootstrapper(WrappedApp).then(() => {
    // render the app
    ReactDOM.hydrate(WrappedApp, document.getElementById('mount'));
  });
};

render();

if (module.hot) {
  module.hot.accept('./utils/renderRoutes', () => render());
}
