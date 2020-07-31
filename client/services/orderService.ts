import axios from 'axios';
import { API_URL } from 'utils/constants';
import { Order } from 'types';
import { catchError } from 'utils/catchError';
import { setAuthToken } from 'utils/auth';

interface OrdersData {
  orders: Order[];
}

const fetchOrders = async (token: string): Promise<OrdersData> => {
  try {
    setAuthToken(token);
    const { data } = await axios.get(`${API_URL}/orders`, {
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
