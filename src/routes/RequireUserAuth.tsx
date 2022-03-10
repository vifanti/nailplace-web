import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

interface RouteProps {
  children: React.ReactElement;
}

const RequireUserAuth: React.FC<RouteProps> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to={{
          pathname: '/signin/users',
        }}
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
};

export default RequireUserAuth;
