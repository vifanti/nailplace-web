import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
  id: string;
  phone_number: string;
  name: string;
  email: string;
  avatar_url: string;
  provider: {
    id: string;
    latitude: number;
    longitude: number;
    providesServices: {
      service: {
        id: number;
        title: string;
        image_url: string;
      };
    }[];
  };
}

interface AuthState {
  token: string;
  user: User;
  isProviderUser: boolean;
}

interface SignInCredentials {
  email: string;
  password: string;
  isProviderUser: boolean;
}

interface AuthContextData {
  user: User;
  isProviderUser: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@NailPlace:token');
    const user = localStorage.getItem('@NailPlace:user');
    const isProviderUser = localStorage.getItem('@NailPlace:isProviderUser');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return {
        token,
        user: JSON.parse(user),
        isProviderUser: isProviderUser === 'true',
      };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password, isProviderUser }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@NailPlace:token', token);
    localStorage.setItem('@NailPlace:user', JSON.stringify(user));
    localStorage.setItem('@NailPlace:isProviderUser', isProviderUser);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user, isProviderUser });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@NailPlace:token');
    localStorage.removeItem('@NailPlace:user');
    localStorage.removeItem('@NailPlace:isProviderUser');

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@NailPlace:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
        isProviderUser: data.isProviderUser,
      });
    },
    [data.token, data.isProviderUser],
  );

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        isProviderUser: data.isProviderUser,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
