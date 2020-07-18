import axios from 'axios';
import { API_URL } from '../utils/constants';
import { User } from '../types';

interface UserData {
  user: User;
  token: string;
}

const getMe = async (token: string) => {
  return await axios.get(`${API_URL}/auth/me`, { params: { token } });
};

const login = async (email: string, password: string): Promise<UserData> => {
  const url = `${API_URL}/auth/login`;
  const { data } = await axios.post(url, { email, password });
  const userData: UserData = {
    user: data.data.user,
    token: data.data.token,
  };
  return userData;
};

const signUp = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}): Promise<UserData> => {
  const url = `${API_URL}/auth/signUp`;
  const { data } = await axios.post(url, { email, password, name });
  const userData: UserData = {
    user: data.data.user,
    token: data.data.token,
  };
  return userData;
};

export const AuthService = {
  getMe,
  login,
  signUp,
};
