import useSWR from 'swr';

import useUser from '@/hooks/user/use-user';
import { CartService } from '@/services';

const useCart = () => {
  const { data: user } = useUser();
  const value = user ? '/api/cart' : null;

  const { data, error } = useSWR(value, CartService.getCart);

  const isLoading = !data && !error;

  return {
    data,
    isLoading,
    error,
  };
};

export default useCart;
