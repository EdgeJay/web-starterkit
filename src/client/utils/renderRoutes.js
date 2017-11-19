import React from 'react';
import { IndexRoute, Route } from 'react-router';
import Main from '../components/Main';
import Home from '../components/Home';
import About from '../components/AboutAsync';
import Features from '../components/FeaturesAsync';
import Libraries from '../components/LibrariesAsync';
import Extend from '../components/Extend';
import Contact from '../components/Contact';

export default function renderRoutes() {
  return (
    <Route path="/" component={Main}>
      <IndexRoute component={Home} />
      <Route path="about" component={About} />
      <Route path="features" component={Features} />
      <Route path="libraries" component={Libraries} />
      <Route path="extend" component={Extend} />
      <Route path="contact" component={Contact} />
    </Route>
  );
}
