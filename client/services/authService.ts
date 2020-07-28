import axios from 'axios';
import { API_URL } from '../utils/constants';
import { User } from '../types';
import { catchError } from '../utils/catchError';
import { setAuthToken } from '../utils/auth';

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

const getMe = async (token: string): Promise<UserData> => {
  setAuthToken(token);
  try {
    const { data } = await axios.get(`${API_URL}/auth/me`);

    const userData: UserData = {
      token: data.data.token,
      user: data.data.user,
    };

    return userData;
  } catch (error) {
    throw new Error(catchError(error));
  }
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
    throw new Error(catchError(error));
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
    throw new Error(catchError(error));
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
    throw new Error(catchError(error));
  }
};

export const changePassword = async (
  token: string,
  passwordFields: UserPasswordData
) => {
  try {
    setAuthToken(token);
    const url = `${API_URL}/auth/change-password`;
    const result = await axios.patch(url, passwordFields);
    return result;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const updateProfile = async (
  token: string,
  userId: string,
  userFields: UserFields
) => {
  try {
    setAuthToken(token);
    const url = `${API_URL}/users/${userId}`;
    const { data } = await axios.patch(url, userFields, {
      params: { id: userId },
    });

    const userData: { user: User } = {
      user: data.data.user,
    };

    return userData;
  } catch (error) {
    throw new Error(catchError(error));
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
