import { useCallback, useState } from 'react';
import { mutate } from 'swr';

import CartService from '@/services/CartService';

interface InitialState {
  addingToCart: boolean;
  error: null | string;
}

const useAddItem = () => {
  const initialState: InitialState = {
    addingToCart: false,
    error: null,
  };

  const [status, setStatus] = useState(initialState);

  const { addingToCart, error } = status;

  const addToCart = useCallback(
    async (productId: string, quantity: number) => {
      setStatus({ ...status, addingToCart: true });
      try {
        await CartService.addCartItem(productId, quantity);
        mutate('/api/cart');
        setStatus({ addingToCart: false, error: null });
      } catch (error) {
        setStatus({ addingToCart: false, error: error.message });
      }
    },
    [status]
  );

  return { addToCart, addingToCart, error };
};

export default useAddItem;
