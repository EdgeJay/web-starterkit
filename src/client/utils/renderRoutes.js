import React from 'react';
import { IndexRoute, Route } from 'react-router';
// import asyncComponent from './asyncComponent';
import Main from '../components/Main';
import Home from '../components/Home';
import Libraries from '../components/Libraries';
import Extend from '../components/Extend';
import Contact from '../components/Contact';

export default function renderRoutes() {
  return (
    <Route path="/" component={Main}>
      <IndexRoute component={Home} />
      <Route
        path="about"
        getComponent={(nextState, callback) => {
          System.import(/* webpackChunkName: "about" */ '../components/About')
            .then(module => module.default)
            .then(Component => callback(null, Component));
        }}
      />
      <Route
        path="features"
        getComponent={(nextState, callback) => {
          System.import(/* webpackChunkName: "features" */ '../components/Features')
            .then(module => module.default)
            .then(Component => callback(null, Component));
        }}
      />
      <Route path="libraries" component={Libraries} />
      <Route path="extend" component={Extend} />
      <Route path="contact" component={Contact} />
    </Route>
  );
}
