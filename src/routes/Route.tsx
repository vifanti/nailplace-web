import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  isProviderRoute?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  isProviderRoute = false,
  component: Component,
  ...rest
}) => {
  const { user, isProviderUser } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        if (isProviderRoute && isProviderUser) {
          return <Component />;
        }

        if (isProviderRoute) {
          return (
            <Redirect
              to={{
                pathname: isProviderRoute
                  ? '/provider/signin'
                  : '/provider/dashboard',
                state: { from: location },
              }}
            />
          );
        }

        if (isPrivate && !!user && !isProviderUser) {
          return <Component />;
        }

        if (isPrivate) {
          return (
            <Redirect
              to={{
                pathname: isPrivate ? '/user/signin' : '/user/dashboard',
                state: { from: location },
              }}
            />
          );
        }

        if (user && isProviderUser) {
          return (
            <Redirect
              to={{
                pathname: '/provider/registration',
                state: { from: location },
              }}
            />
          );
        }

        if (user) {
          return (
            <Redirect
              to={{
                pathname: '/user/dashboard',
                state: { from: location },
              }}
            />
          );
        }

        return <Component />;
      }}
    />
  );
};

export default Route;
