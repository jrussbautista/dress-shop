import { useCallback } from 'react';
import { mutate } from 'swr';

import { AuthService } from '@/services';
import { autoLogin } from '@/utils/auth';

const useLogin = () => {
  return useCallback(async (email: string, password: string) => {
    const { token } = await AuthService.login(email, password);
    autoLogin(token);
    mutate('/api/me');
  }, []);
};

export default useLogin;
