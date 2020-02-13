import axios from 'axios';
import cookie from 'js-cookie';
import Router, { useRouter } from 'next/router';
import React, { createContext, useContext, useReducer } from 'react';
import { autoLogin } from '../../utils/auth';
import baseURL from '../../utils/baseURL';
import reducer from './authReducer';
import {
  CLEAR_AUTH_ERROR,
  LOGOUT_USER,
  SET_AUTH_ERROR,
  SET_CURRENT_USER
} from './authTypes';

const AuthContext = createContext();

const AuthProvider = ({ children, currentUser }) => {
  const initialState = {
    currentUser,
    error: null
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { ref } = useRouter().query;

  const setCurrentUser = async token => {
    const payload = { headers: { Authorization: token } };
    const { data } = await axios.get(`${baseURL}/api/account`, payload);
    const isAdmin = data.role === 'admin';
    dispatch({ type: SET_CURRENT_USER, payload: data });
    if (isAdmin) {
      autoLogin(token, '/admin');
    } else {
      const url = ref ? `/product?id=${ref}` : '/';
      autoLogin(token, url);
    }
  };

  const login = async user => {
    try {
      const { data } = await axios.post(`${baseURL}/api/login`, user);
      setCurrentUser(data);
      return 'success';
    } catch (error) {
      dispatch({ type: SET_AUTH_ERROR, payload: error.response.data });
      return 'error';
    }
  };

  const signUp = async user => {
    try {
      const { data } = await axios.post(`${baseURL}/api/signup`, user);
      setCurrentUser(data);
      return 'success';
    } catch (error) {
      dispatch({ type: SET_AUTH_ERROR, payload: error.response.data });
      return 'error';
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
