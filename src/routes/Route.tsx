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
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        console.log(isPrivate);
        console.log(isProviderRoute);
        if (isProviderRoute && user && 'provider' in user) {
          console.log(
            'Rota de prestador com prestador logado. Carrega o componente',
          );

          return <Component />;
        }

        if (isProviderRoute && user) {
          console.log(
            'Rota de prestador com usuário logado sem prestador. Provider registration',
          );

          return (
            <Redirect
              to={{
                pathname: '/provider/registration',
                state: { from: location },
              }}
            />
          );
        }

        if (isProviderRoute) {
          console.log('Rota de prestador sem usuário logado. Provider Signin');

          return (
            <Redirect
              to={{
                pathname: '/provider/signin',
                state: { from: location },
              }}
            />
          );
        }

        if (isPrivate && user && !('provider' in user)) {
          console.log(
            'Rota de usuário com usuário logado. Carrega o componente',
          );
          return <Component />;
        }

        if (isPrivate) {
          console.log('Rota de prestador sem usuário logado. Provider Signin');
          return (
            <Redirect
              to={{
                pathname: '/user/signin',
                state: { from: location },
              }}
            />
          );
        }

        if (user && 'provider' in user) {
          console.log(
            'Rota não segura com prestador logado. Provider dashboard',
          );

          return (
            <Redirect
              to={{
                pathname: '/provider/dashboard',
                state: { from: location },
              }}
            />
          );
        }

        if (user) {
          console.log('Rota não segura com usuário logado. User dashboard');
          return (
            <Redirect
              to={{
                pathname: '/user/dashboard',
                state: { from: location },
              }}
            />
          );
        }

        console.log('Rota não segura sem usuário logado');

        return <Component />;
      }}
    />
  );
};

export default Route;
