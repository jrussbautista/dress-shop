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

  const login = async (email: string, password: string, adminRedirect?: boolean): Promise<void> => {
    const { user, token } = await AuthService.login(email, password);
    dispatch({ type: SET_CURRENT_USER, payload: user });
    let url = '';
    if (adminRedirect) {
      url = '/admin?selected_page=dashboard';
    } else {
      url = ref ? `/product?id=${ref}` : '/profile';
    }
    autoLogin(token, url);
  };

  const signUp = async ({ email, password, name }: UserDetails) => {
    const { user, token } = await AuthService.signUp({ email, password, name });
    dispatch({ type: SET_CURRENT_USER, payload: user });
    const url = '/profile';
    autoLogin(token, url);
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
    <AuthContext.Provider value={{ ...state, login, signUp, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): InitialStateType => useContext(AuthContext);
