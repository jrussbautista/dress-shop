import { Order } from 'types';
import { catchError } from 'utils/catchError';
import { setAuthToken } from 'utils/auth';
import apiClient from 'api/apiClient';

interface OrdersData {
  orders: Order[];
}

const fetchOrders = async (token: string): Promise<OrdersData> => {
  try {
    setAuthToken(token);
    const { data } = await apiClient.get('/orders', {
      params: { token },
    });

    const ordersData: OrdersData = {
      orders: data.data.orders,
    };

    return ordersData;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const OrderService = {
  fetchOrders,
};
