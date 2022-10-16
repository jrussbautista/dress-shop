import useSWR from 'swr';

import useUser from '@/hooks/user/useUser';
import CartService from '@/services/CartService';

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
