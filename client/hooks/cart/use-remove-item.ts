import { useCallback, useState } from 'react';
import { mutate } from 'swr';

import { CartService } from '@/services';

interface InitialState {
  removingFromCart: boolean;
  error: null | string;
}

const useRemoveItem = () => {
  const initialState: InitialState = {
    removingFromCart: false,
    error: null,
  };

  const [status, setStatus] = useState(initialState);

  const { removingFromCart, error } = status;

  const removeFromCart = useCallback(
    async (productId: string) => {
      setStatus({ ...status, removingFromCart: true });
      try {
        await CartService.removeCartItem(productId);
        mutate('/api/cart');
      } catch (error) {
        setStatus({ removingFromCart: false, error: error.message });
      }
    },
    [status]
  );

  return { removeFromCart, removingFromCart, error };
};

export default useRemoveItem;
