import { Order } from 'types';
import apiClient from 'utils/apiClient';
import { catchError } from 'utils/catchError';

const getOrders = async (): Promise<Order[]> => {
  try {
    const { data } = await apiClient.get('/orders');
    return data.data;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const OrderService = {
  getOrders,
};
