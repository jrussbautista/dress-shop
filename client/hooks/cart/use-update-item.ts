import { useCallback, useState } from 'react';
import { mutate } from 'swr';

import { CartService } from '@/services';

interface InitialState {
  updatingToCart: boolean;
  error: null | string;
}

const useUpdateItem = () => {
  const initialState: InitialState = {
    updatingToCart: false,
    error: null,
  };

  const [status, setStatus] = useState(initialState);

  const { updatingToCart, error } = status;

  const updateFromCart = useCallback(
    async (productId: string, quantity: number) => {
      setStatus({ ...status, updatingToCart: true });
      try {
        await CartService.updateQuantityCarItem(productId, quantity);
        mutate('/api/cart');
      } catch (error) {
        setStatus({ updatingToCart: false, error: error.message });
      }
    },
    [status]
  );

  return { updateFromCart, updatingToCart, error };
};

export default useUpdateItem;
