import { useCallback } from 'react';
import { mutate } from 'swr';

import { AuthService } from '@/services';
import { UpdateUserFields } from '@/types';

const useUpdateUser = () => {
  return useCallback(async (userId: string, fields: UpdateUserFields) => {
    await AuthService.updateProfile(userId, fields);
    mutate('/api/me');
  }, []);
};

export default useUpdateUser;
