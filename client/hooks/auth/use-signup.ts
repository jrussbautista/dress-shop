import { useCallback } from 'react';
import { mutate } from 'swr';

import { AuthService } from '@/services';
import { autoLogin } from '@/utils/auth';

const useSignup = () => {
  return useCallback(
    async ({ email, name, password }: { email: string; name: string; password: string }) => {
      const { token } = await AuthService.signUp({ email, name, password });
      autoLogin(token);
      mutate('/api/me');
    },
    []
  );
};

export default useSignup;
