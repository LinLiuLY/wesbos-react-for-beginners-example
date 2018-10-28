import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import StorePicker from './StorePicker';
import App from './App';
import NotFound from './NotFound';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={StorePicker} />
      <Route path="/stores/:storeId" component={App} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);
