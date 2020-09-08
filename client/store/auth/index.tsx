import Router, { useRouter } from 'next/router';
import React, { createContext, useContext, useReducer } from 'react';
import { autoLogin } from 'utils/auth';
import { LOGOUT_USER, SET_CURRENT_USER, UPDATE_USER } from './authTypes';
import { User } from 'types';
import { destroyCookie } from 'nookies';
import reducer from './authReducer';

interface InitialStateType {
  isAuthenticated: boolean;
  currentUser: User | null;
  error: null | string;
  logout(redirectUrl: string): void;
  login(user: User, token: string, adminRedirect?: boolean): void;
  updateUser(user: User): void;
}

const initialState = {
  isAuthenticated: false,
  currentUser: null,
  error: null,
  logout: () => null,
  login: () => null,
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

  const login = async (user: User, token: string, adminRedirect?: boolean) => {
    dispatch({ type: SET_CURRENT_USER, payload: user });
    let url = '';
    if (adminRedirect) {
      url = '/admin?selected_page=dashboard';
    } else {
      url = ref ? `/product?id=${ref}` : '/profile';
    }
    autoLogin(token, url);
  };

  const logout = (redirectUrl: string) => {
    destroyCookie({}, 'token');
    Router.push(redirectUrl);
    dispatch({ type: LOGOUT_USER });
  };

  const updateUser = (user: User) => {
    dispatch({ type: UPDATE_USER, payload: user });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): InitialStateType => useContext(AuthContext);
