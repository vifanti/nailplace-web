import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import Route from './Route';
import UserRoutes from './UserRoutes';
import ProviderRoutes from './ProviderRoutes';

import Home from '../pages/Common/Home';
import ForgotPassword from '../pages/Common/ForgotPassword';
import ResetPassword from '../pages/Common/ResetPassword';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/reset-password" component={ResetPassword} />

    <Route path="/user" component={UserRoutes} />
    <Route path="/provider" component={ProviderRoutes} />
  </Switch>
);

export default Routes;
