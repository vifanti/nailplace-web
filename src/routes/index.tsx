import React from 'react';
import {
  Routes as Switch,
  Route,
  useLocation,
  Navigate,
  Outlet,
} from 'react-router-dom';

// import Route from './Route';
// import UserRoutes from './UserRoutes';
// import ProviderRoutes from './ProviderRoutes';

import { useAuth } from '../hooks/auth';

import Home from '../pages/Common/Home';
import ProviderRegistration from '../pages/Providers/ProviderRegistration';
import ProviderSignIn from '../pages/Providers/ProviderSignIn';
// import ForgotPassword from '../pages/Common/ForgotPassword';
// import ResetPassword from '../pages/Common/ResetPassword';
import Dashboard from '../pages/Users/Dashboard';
import UserSignIn from '../pages/Users/UserSignIn';
import RequireProviderAuth from './RequireProviderAuth';
import RequireUserAuth from './RequireUserAuth';

type LocationState = {
  from: { pathname: string };
};

const Routes: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const locationState = location.state as LocationState;

  const pathname = locationState?.from?.pathname;

  return (
    <Switch>
      <Route index element={<Home />} />

      <Route path="/signin" element={<Outlet />}>
        <Route
          path="/signin/users"
          element={
            user ? (
              <Navigate
                to={{ pathname: pathname ?? '/users/dashboard' }}
                replace
              />
            ) : (
              <UserSignIn />
            )
          }
        />
        <Route
          path="/signin/providers"
          element={
            user && 'provider' in user ? (
              <Navigate
                to={{ pathname: pathname ?? '/providers/dashboard' }}
                replace
              />
            ) : (
              <ProviderSignIn />
            )
          }
        />
      </Route>

      <Route
        path="/users"
        element={
          <RequireUserAuth>
            <Outlet />
          </RequireUserAuth>
        }
      >
        <Route path="/users/dashboard" element={<Dashboard />} />
      </Route>

      <Route
        path="/providers"
        element={
          <RequireProviderAuth>
            <Outlet />
          </RequireProviderAuth>
        }
      >
        <Route path="/providers/dashboard" element={<Dashboard />} />
        <Route
          path="/providers/registration"
          element={<ProviderRegistration />}
        />
      </Route>
    </Switch>
  );
};

export default Routes;
