import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { Dashboard } from '@/pages';

export function PrivateRouters() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Dashboard} path="/dashboard" />

        <Redirect from='/login' to='/dashboard' />
        <Redirect exact from='/' to='/dashboard' />
      </Switch>
    </BrowserRouter>
  );
}