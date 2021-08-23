import useSWR from 'swr';

import useUser from '@/hooks/user/use-user';
import { OrderService } from '@/services/OrderService';

const useOrders = () => {
  const { data: user } = useUser();
  const value = user ? 'api/orders' : null;

  const { data, error } = useSWR(value, OrderService.getOrders);

  const isLoading = !data && !error;

  return {
    data,
    error,
    isLoading,
  };
};

export default useOrders;
