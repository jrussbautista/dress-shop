import useSWR from 'swr';

import useUser from '@/hooks/user/use-user';
import { WishlistService } from '@/services/WishlistService';

const useWishlist = () => {
  const { data: user } = useUser();
  const value = user ? '/api/wishlist' : null;

  const { data, error } = useSWR(value, WishlistService.getWishlist);

  const isLoading = !data && !error;

  return {
    data,
    error,
    isLoading,
  };
};

export default useWishlist;
