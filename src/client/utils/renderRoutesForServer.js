import React from 'react';
import { IndexRoute, Route } from 'react-router';
import About from '../components/About';
import Main from '../components/Main';
import Home from '../components/Home';
import Features from '../components/Features';
import Libraries from '../components/Libraries';
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
