//client/routes.js
import React from 'react';
import ( Rout, Switch } from 'react-router-dom';
import App from './components/App';

export const Routes = () => (
  <Switch>
    <Route exact path='/' component={App} />
  </Switch>
);

export default Routes;
