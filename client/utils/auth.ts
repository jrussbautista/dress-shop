import { setCookie, destroyCookie } from 'nookies';

import apiClient from '@/lib/apiClient';

export const setAuthToken = (token: string) => {
  apiClient.defaults.headers.common['Authorization'] = '';
  delete apiClient.defaults.headers.common['Authorization'];

  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

export const deleteAuthToken = () => {
  apiClient.defaults.headers.common['Authorization'] = '';
  delete apiClient.defaults.headers.common['Authorization'];
};

export const autoLogin = (token: string) => {
  setCookie({}, 'token', token, {});
  setAuthToken(token);
};

export const autoLogout = () => {
  destroyCookie({}, 'token');
  deleteAuthToken();
};
