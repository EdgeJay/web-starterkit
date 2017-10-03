import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { AppContainer } from 'react-hot-loader';

const enableHMR = (process.env.ENABLE_WEBPACK_HMR === 'true' &&
  process.env.NODE_ENV !== 'production');

const App = (props) => {
  if (enableHMR) {
    return (
      <AppContainer>
        <Provider store={props.store}>
          <Router history={props.history} routes={props.routes} />
        </Provider>
      </AppContainer>
    );
  }

  return (
    <Provider store={props.store}>
      <Router history={props.history} routes={props.routes} />
    </Provider>
  );
};

App.propTypes = {
  store: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object,
  ]).isRequired,
  history: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object,
  ]).isRequired,
  routes: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object,
  ]).isRequired,
};

export default App;
