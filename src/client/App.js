import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

const App = props => (
  <Provider store={props.store}>
    <Router history={props.history} routes={props.routes} />
  </Provider>
);

App.propTypes = {
  store: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
  history: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  routes: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
};

export default App;
