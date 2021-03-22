import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Home from '../Pages/Home';
import UserSignIn from '../Pages/UserSignIn';
import UserSignUp from '../Pages/UserSignUp';
import ProviderSignIn from '../Pages/ProviderSignIn';
import ProviderSignUp from '../Pages/ProviderSignUp';
import ProviderRegistration from '../Pages/ProviderRegistration';
import ForgotPassword from '../Pages/ForgotPassword';
import ResetPassword from '../Pages/ResetPassword';

// import Profile from '../Pages/Profile';
import Dashboard from '../Pages/Dashboard';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/user-signin" exact component={UserSignIn} />
    <Route path="/user-signup" exact component={UserSignUp} />
    <Route path="/provider-signin" exact component={ProviderSignIn} />
    <Route path="/provider-signup" exact component={ProviderSignUp} />
    <Route
      path="/provider-registration"
      exact
      component={ProviderRegistration}
      isPrivate
      isProviderRoute
    />
    <Route path="/forgot-password" exact component={ForgotPassword} />
    <Route path="/reset-password" exact component={ResetPassword} />

    {/* <Route path="/profile" exact component={Profile} isPrivate /> */}
    <Route path="/dashboard" exact component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
