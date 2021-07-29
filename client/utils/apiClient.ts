import axios from 'axios';
import { parseCookies } from 'nookies';

import { API_URL } from 'utils/constants';

const instance = axios.create({
  baseURL: API_URL,
});

const { token } = parseCookies({});

if (token) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default instance;
