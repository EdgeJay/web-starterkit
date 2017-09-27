import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import routes from './routes';
import { configureStore } from './stores';

// eslint-disable-next-line dot-notation
const store = configureStore(browserHistory, window['__preload__']);
const history = syncHistoryWithStore(browserHistory, store);

const render = () => {
  ReactDOM.hydrate(
    <AppContainer>
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    </AppContainer>,
    document.getElementById('mount'));
};

render();

/*
if (module.hot) {
  module.hot.accept('./App', () => render(App));
}
*/
