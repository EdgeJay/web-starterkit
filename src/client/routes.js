import React from 'react';
import { Route } from 'react-router';
import Main from './components/Main';
import About from './components/About';
import Libraries from './components/Libraries';
import Extend from './components/Extend';
import Contact from './components/Contact';

export default function renderRoutes() {
  return (
    <Route path="/" component={Main}>
      <Route path="about" component={About} />
      <Route path="libraries" component={Libraries} />
      <Route path="extend" component={Extend} />
      <Route path="contact" component={Contact} />
    </Route>
  );
}
