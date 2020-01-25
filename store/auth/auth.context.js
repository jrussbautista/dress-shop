import React, { createContext, useReducer, useContext } from 'react';
import {
  LOGOUT_USER,
  SET_CURRENT_USER,
  SET_AUTH_ERROR,
  CLEAR_AUTH_ERROR
} from './auth.types';
import { autoLogin } from '../../utils/auth';
import axios from 'axios';
import cookie from 'js-cookie';
import Router, { useRouter } from 'next/router';
import reducer from './auth.reducer';
import baseURL from '../../utils/baseURL';

const AuthContext = createContext();

const AuthProvider = ({ children, currentUser }) => {
  const initialState = {
    currentUser,
    error: null
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const setCurrentUser = async token => {
    const payload = { headers: { Authorization: token } };
    const { data } = await axios.get(`${baseURL}/api/account`, payload);
    const isAdmin = data.role === 'admin';
    dispatch({ type: SET_CURRENT_USER, payload: data });
    if (isAdmin) {
      autoLogin(token, '/admin');
    } else {
      const { ref } = useRouter().query;
      const url = ref ? `/product?id=${ref}` : '/';
      autoLogin(token, url);
    }
  };

  const login = async user => {
    try {
      const { data } = await axios.post(`${baseURL}/api/login`, user);
      setCurrentUser(data);
    } catch (error) {
      dispatch({ type: SET_AUTH_ERROR, payload: error.response.data });
    }
  };

  const signUp = async user => {
    try {
      const { data } = await axios.post(`${baseURL}/api/signup`, user);
      setCurrentUser(data);
    } catch (error) {
      dispatch({ type: SET_AUTH_ERROR, payload: error.response.data });
    }
  };

  const logout = () => {
    cookie.remove('token');
    window.localStorage.setItem('logout', Date.now());
    Router.push('/login');
    dispatch({ type: LOGOUT_USER });
  };

  const clearError = () => {
    dispatch({ type: CLEAR_AUTH_ERROR });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser: state.currentUser,
        error: state.error,
        logout,
        login,
        signUp,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
