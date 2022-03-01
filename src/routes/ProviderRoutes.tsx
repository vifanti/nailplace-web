import React from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';

import ProviderSignIn from '../pages/Providers/ProviderSignIn';
import ProviderSignUp from '../pages/Providers/ProviderSignUp';
import ProviderRegistration from '../pages/Providers/ProviderRegistration';
import ProviderDashboard from '../pages/Providers/ProviderDashboard';

import Route from './Route';

const Routes: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/signin`} component={ProviderSignIn} />
      <Route path={`${path}/signup`} component={ProviderSignUp} />
      <Route
        path={`${path}/registration`}
        exact
        component={ProviderRegistration}
        isPrivate
      />
      <Route
        path={`${path}/dashboard`}
        exact
        component={ProviderDashboard}
        isPrivate
        isProviderRoute
      />
    </Switch>
  );
};

export default Routes;
