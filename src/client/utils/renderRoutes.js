import React from 'react';
import { IndexRoute, Route } from 'react-router';
import asyncComponent from './asyncComponent';
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
        component={asyncComponent(() => (
          System.import('../components/About').then(module => module.default)
        ))}
      />
      <Route
        path="features"
        component={asyncComponent(() => (
          System.import('../components/Features').then(module => module.default)
        ))}
      />
      <Route path="libraries" component={Libraries} />
      <Route path="extend" component={Extend} />
      <Route path="contact" component={Contact} />
    </Route>
  );
}
