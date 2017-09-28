import React from 'react';
import { Route } from 'react-router';
import Hello from './components/Hello';

export default function renderRoutes() {
  return (
    <Route path="/" component={Hello} />
  );
}
