import { useCallback, useState } from 'react';
import { mutate } from 'swr';

import { CheckOutService } from '@/services';

interface InitialState {
  addingOrder: boolean;
  error: null | string;
}

const useAddOrder = () => {
  const initialState: InitialState = {
    addingOrder: false,
    error: null,
  };

  const [status, setStatus] = useState(initialState);

  const { addingOrder, error } = status;

  const addOrder = useCallback(
    async (paymentMethodId: string) => {
      setStatus({ ...status, addingOrder: true });
      try {
        await CheckOutService.stripeCharge(paymentMethodId);
        mutate('/api/orders');
      } catch (error) {
        setStatus({ addingOrder: false, error: error.message });
      }
    },
    [status]
  );

  return { addOrder, addingOrder, error };
};

export default useAddOrder;
