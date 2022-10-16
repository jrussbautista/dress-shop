import { parseCookies } from 'nookies';
import useSWR from 'swr';

import AuthService from '@/services/AuthService';

const useUser = () => {
  const { token } = parseCookies({});
  const value = token ? '/api/me' : null;

  const { data, error } = useSWR(value, AuthService.getMe);

  const isLoading = !data && !error;

  const user = data?.user;

  if (!token) {
    return {
      isLoading: false,
      error: null,
      data: null,
    };
  }

  return {
    data: user,
    error,
    isLoading,
  };
};

export default useUser;
