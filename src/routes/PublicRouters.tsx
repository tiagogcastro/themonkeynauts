import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { Login, Register } from '@/pages';

export function PublicRouters() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Login} exact path="/" />
        <Route component={Login} path="/login" />
        <Route component={Register} path="/register" />

        <Route path="*" component={() => <Redirect to="/login" />} />
      </Switch>
    </BrowserRouter>
  );
}