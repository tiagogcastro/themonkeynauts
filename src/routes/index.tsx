import { BrowserRouter, Switch } from 'react-router-dom';

import { CustomRouter } from './CustomRouter';

import {
  Login,
  Register,
  Dashboard
} from '../pages';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        <CustomRouter component={Login} exact path="/" />
        <CustomRouter component={Login} path="/login" />
        <CustomRouter component={Register} path="/register" />

        <CustomRouter component={Dashboard} path="/dashboard" />
      </Switch>
    </BrowserRouter>
  )
}