import apiClient from '@/lib/apiClient';
import { catchError } from '@/utils/catchError';
import { Order } from 'types';

const getOrders = async (): Promise<Order[]> => {
  try {
    const { data } = await apiClient.get('/orders');
    return data.data;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

const OrderService = {
  getOrders,
};

export default OrderService;
