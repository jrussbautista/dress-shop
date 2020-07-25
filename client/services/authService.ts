import axios from 'axios';
import { API_URL } from '../utils/constants';
import { User } from '../types';

interface UserData {
  user: User;
  token: string;
}

interface UserPasswordData {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface UserFields {
  name: string;
  email: string;
  image: string | ArrayBuffer | null;
}

const getMe = async (token: string) => {
  return await axios.get(`${API_URL}/auth/me`, { params: { token } });
};

const verifyGoogleIdToken = async (idToken: string): Promise<UserData> => {
  try {
    const url = `${API_URL}/auth/google`;
    const { data } = await axios.post(url, { idToken });
    const userData: UserData = {
      user: data.data.user,
      token: data.data.token,
    };
    return userData;
  } catch (error) {
    throw new Error(error.response.data.error.message);
  }
};

const login = async (email: string, password: string): Promise<UserData> => {
  try {
    const url = `${API_URL}/auth/login`;
    const { data } = await axios.post(url, { email, password });
    const userData: UserData = {
      user: data.data.user,
      token: data.data.token,
    };
    return userData;
  } catch (error) {
    throw new Error(error.response.data.error.message);
  }
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
  try {
    const url = `${API_URL}/auth/signUp`;
    const { data } = await axios.post(url, { email, password, name });
    const userData: UserData = {
      user: data.data.user,
      token: data.data.token,
    };
    return userData;
  } catch (error) {
    throw new Error(error.response.data.error.message);
  }
};

export const changePassword = async (
  token: string,
  passwordFields: UserPasswordData
) => {
  try {
    const url = `${API_URL}/auth/change-password`;
    const result = await axios.patch(url, passwordFields, {
      params: { token },
    });
    return result;
  } catch (error) {
    throw new Error(error.response.data.error.message);
  }
};

export const updateProfile = async (
  token: string,
  userId: string,
  userFields: UserFields
) => {
  try {
    const url = `${API_URL}/users/${userId}`;
    const { data } = await axios.patch(url, userFields, {
      params: { token, id: userId },
    });

    const userData: { user: User } = {
      user: data.data.user,
    };

    return userData;
  } catch (error) {
    const errorMessage =
      error.response.data?.error?.message || error.response.statusText;
    throw new Error(errorMessage);
  }
};

export const AuthService = {
  getMe,
  login,
  signUp,
  verifyGoogleIdToken,
  changePassword,
  updateProfile,
};
