import axios, { AxiosRequestConfig } from 'axios';
import { API_URL } from 'utils/constants';
import { parseCookies } from 'nookies';

const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use(function (config: AxiosRequestConfig) {
  const { token } = parseCookies({});
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  return config;
});

export default instance;
