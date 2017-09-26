import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Hello from './components/Hello';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('mount'));
};

render(Hello);

if (module.hot) {
  module.hot.accept('./components/Hello', () => render(Hello));
}
