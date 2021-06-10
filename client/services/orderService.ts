import { Order } from 'types';
import { catchError } from 'utils/catchError';
import apiClient from 'utils/apiClient';

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
