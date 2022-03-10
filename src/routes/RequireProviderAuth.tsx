import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

interface RouteProps {
  children: React.ReactElement;
}

const RequireProviderAuth: React.FC<RouteProps> = ({ children }) => {
  const { user, updateUser } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to={{
          pathname: '/signin/providers',
        }}
        state={{ from: location }}
        replace
      />
    );
  }

  // if (!('provider' in user)) {
  //   // updateUser({ ...user, provider: {} });
  //   return (
  //     <Navigate
  //       to={{
  //         pathname: '/providers/register',
  //       }}
  //       state={{ from: location }}
  //       replace
  //     />
  //   );
  // }

  return children;
};

export default RequireProviderAuth;
