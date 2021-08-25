import { useCallback, useState } from 'react';
import { mutate } from 'swr';

import { WishlistService } from '@/services';

interface InitialState {
  addingToWishlist: boolean;
  error: null | string;
}

const useAddItem = () => {
  const initialState: InitialState = {
    addingToWishlist: false,
    error: null,
  };

  const [status, setStatus] = useState(initialState);

  const { addingToWishlist, error } = status;

  const addToWishlist = useCallback(
    async (productId: string) => {
      setStatus({ ...status, addingToWishlist: true });
      try {
        await WishlistService.addWishlistItem(productId);
        mutate('/api/wishlist');
        setStatus({ addingToWishlist: false, error: null });
      } catch (error) {
        setStatus({ addingToWishlist: false, error: error.message });
      }
    },
    [status]
  );

  return { addToWishlist, addingToWishlist, error };
};

export default useAddItem;
