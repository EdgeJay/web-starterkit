import React from 'react';
import { Route } from 'react-router';
import Main from './components/Main';

export default function renderRoutes() {
  return (
    <Route path="/" component={Main} />
  );
}
