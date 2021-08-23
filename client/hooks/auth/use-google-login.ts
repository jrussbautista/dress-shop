import { useCallback } from 'react';
import { mutate } from 'swr';

import { AuthService } from '@/services';
import { autoLogin } from '@/utils/auth';

const useGoogleLogin = () => {
  return useCallback(async (idToken: string) => {
    const { token } = await AuthService.verifyGoogleIdToken(idToken);
    autoLogin(token);
    mutate('/api/me');
  }, []);
};

export default useGoogleLogin;
