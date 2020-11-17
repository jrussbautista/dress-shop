import { Order } from 'types';
import { catchError } from 'utils/catchError';
import apiClient from 'utils/apiClient';

interface OrdersData {
  orders: Order[];
}

const fetchOrders = async (): Promise<OrdersData> => {
  try {
    const { data } = await apiClient.get('/orders');

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
