import React from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';

import UserSignIn from '../pages/Users/UserSignIn';
import UserSignUp from '../pages/Users/UserSignUp';
import Dashboard from '../pages/Users/Dashboard';

import Route from './Route';

const Routes: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/signin`} component={UserSignIn} />
      <Route path={`${path}/signup`} component={UserSignUp} />
      <Route path={`${path}/dashboard`} component={Dashboard} isPrivate />
    </Switch>
  );
};

export default Routes;
