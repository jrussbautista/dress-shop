import Router, { useRouter } from 'next/router';
import React, { createContext, useContext, useReducer } from 'react';
import { autoLogin } from 'utils/auth';
import { LOGOUT_USER, SET_CURRENT_USER, UPDATE_USER } from './authTypes';
import { User } from 'types';
import { destroyCookie } from 'nookies';
import reducer from './authReducer';
import { AuthService } from 'services';

interface UserDetails {
  email: string;
  password: string;
  name: string;
}

interface InitialStateType {
  isAuthenticated: boolean;
  currentUser: User | null;
  error: null | string;
  logout(redirectUrl: string): void;
  login(email: string, password: string, adminRedirect?: boolean): void;
  loginWithGoogle(tokenId: string): void;
  signUp(userDetails: UserDetails): void;
  updateUser(user: User): void;
}

const initialState = {
  isAuthenticated: false,
  currentUser: null,
  error: null,
  logout: () => null,
  login: () => null,
  signUp: () => null,
  loginWithGoogle: () => null,
  updateUser: () => null,
};

const AuthContext = createContext<InitialStateType>(initialState);

type Props = {
  currentUser: User | null;
};

export const AuthProvider: React.FC<Props> = ({ children, currentUser }) => {
  const initialState = {
    currentUser,
    error: null,
    isAuthenticated: currentUser ? true : false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { ref } = useRouter().query;

  const loginSuccess = (user: User, token: string, adminRedirect = false) => {
    dispatch({ type: SET_CURRENT_USER, payload: user });

    if (adminRedirect) {
      if (user.role !== 'admin') {
        throw new Error('You are not authorize to access this page');
      }
    }

    const url = adminRedirect
      ? '/admin?selected_page=dashboard'
      : ref
      ? `/product?id=${ref}`
      : '/profile';

    autoLogin(token, url);
  };

  const login = async (email: string, password: string, adminRedirect?: boolean): Promise<void> => {
    const { user, token } = await AuthService.login(email, password);
    loginSuccess(user, token, adminRedirect);
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
    Router.push(redirectUrl);
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

export const useAuth = (): InitialStateType => useContext(AuthContext);
