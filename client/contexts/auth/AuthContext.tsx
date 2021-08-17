import { useRouter } from 'next/router';
import { destroyCookie, parseCookies } from 'nookies';
import React, { createContext, useContext, useReducer, useEffect } from 'react';

import { AuthService } from '@/services';
import { User } from '@/types';
import { autoLogin, autoLogout } from '@/utils/auth';

import reducer from './auth-reducer';
import { LOGOUT_USER, SET_CURRENT_USER, UPDATE_USER } from './auth-types';

interface UserDetails {
  email: string;
  password: string;
  name: string;
}

interface Context {
  isAuthenticated: boolean;
  currentUser: User | null;
  loading: boolean;
  error: null | string;
  logout(redirectUrl: string): void;
  login(email: string, password: string): void;
  loginWithGoogle(tokenId: string): void;
  signUp(userDetails: UserDetails): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<Context | undefined>(undefined);
AuthContext.displayName = 'AuthContext';

export const AuthProvider: React.FC = ({ children }) => {
  const initialState = {
    isAuthenticated: false,
    currentUser: null,
    error: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const { query } = useRouter();

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const { token } = parseCookies({});
        if (!token) {
          return;
        }

        const { user } = await AuthService.getMe();
        dispatch({ type: SET_CURRENT_USER, payload: user });
      } catch (error) {
        dispatch({ type: LOGOUT_USER });
      }
    };

    loadCurrentUser();
  }, []);

  const loginSuccess = (user: User, token: string) => {
    const { ref } = query;

    dispatch({ type: SET_CURRENT_USER, payload: user });

    const url = ref ? `/product?id=${ref}` : '/profile';

    autoLogin(token, url);
  };

  const login = async (email: string, password: string): Promise<void> => {
    const { user, token } = await AuthService.login(email, password);
    loginSuccess(user, token);
  };

  const loginWithGoogle = async (tokenId: string) => {
    const { user, token } = await AuthService.verifyGoogleIdToken(tokenId);
    loginSuccess(user, token);
  };

  const signUp = async ({ email, password, name }: UserDetails) => {
    const { user, token } = await AuthService.signUp({ email, password, name });
    loginSuccess(user, token);
  };

  const logout = (redirectUrl: string) => {
    destroyCookie({}, 'token');
    dispatch({ type: LOGOUT_USER });
    autoLogout(redirectUrl);
  };

  const updateUser = (user: User) => {
    dispatch({ type: UPDATE_USER, payload: user });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, loginWithGoogle, signUp, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be within AuthProvider');
  }
  return context;
};
