import Router, { useRouter } from 'next/router';
import React, { createContext, useContext, useReducer } from 'react';
import { autoLogin } from 'utils/auth';
import { LOGOUT_USER, SET_CURRENT_USER, UPDATE_USER } from './authTypes';
import { User, UserFields } from 'types';
import { destroyCookie } from 'nookies';
import { AuthService } from 'services';
import reducer from './authReducer';

interface InitialStateType {
  currentUser: User | null;
  error: null | string;
  logout(): void;
  setCurrentUser(user: User, token: string): void;
  updateUser(user: User): void;
  login(email: string, password: string): void;
  signUp(userFields: UserFields): void;
}

const initialState = {
  currentUser: null,
  error: null,
  logout: () => null,
  login: () => null,
  signUp: () => null,
  setCurrentUser: () => null,
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
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { ref } = useRouter().query;

  const setCurrentUser = async (user: User, token: string) => {
    dispatch({ type: SET_CURRENT_USER, payload: user });
    const url = ref ? `/product?id=${ref}` : '/profile';
    autoLogin(token, url);
  };

  const login = (email: string, password: string) => {
    AuthService.login(email, password)
      .then(({ user, token }) => {
        setCurrentUser(user, token);
      })
      .catch((error) => {
        throw error;
      });
  };

  const signUp = (userFields: UserFields) => {
    AuthService.signUp(userFields)
      .then(({ user, token }) => {
        setCurrentUser(user, token);
      })
      .catch((error) => {
        throw error;
      });
  };

  const logout = () => {
    destroyCookie({}, 'token');
    Router.push('/auth?type=login');
    dispatch({ type: LOGOUT_USER });
  };

  const updateUser = (user: User) => {
    dispatch({ type: UPDATE_USER, payload: user });
  };

  return (
    <AuthContext.Provider value={{ ...state, setCurrentUser, logout, updateUser, login, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): InitialStateType => useContext(AuthContext);
