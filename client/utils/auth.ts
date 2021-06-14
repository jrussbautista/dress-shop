import Router from 'next/router';
import { setCookie, destroyCookie } from 'nookies';
import apiClient from './apiClient';

export const setAuthToken = (token: string): void => {
  apiClient.defaults.headers.common['Authorization'] = '';
  delete apiClient.defaults.headers.common['Authorization'];

  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

export const deleteAuthToken = (): void => {
  apiClient.defaults.headers.common['Authorization'] = '';
  delete apiClient.defaults.headers.common['Authorization'];
};

export const autoLogin = (token: string, location: string): void => {
  setCookie({}, 'token', token, {});
  setAuthToken(token);
  Router.push(location);
};

export const autoLogout = (redirectUrl: string): void => {
  destroyCookie({}, 'token');
  deleteAuthToken();
  window.location.href = redirectUrl;
};
