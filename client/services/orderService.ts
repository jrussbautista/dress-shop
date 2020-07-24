import axios from 'axios';
import { API_URL } from '../utils/constants';
import { Order } from '../types';

interface OrdersData {
  orders: Order[];
}

const fetchOrders = async (token: string): Promise<OrdersData> => {
  const { data } = await axios.get(`${API_URL}/orders`, { params: { token } });

  const ordersData: OrdersData = {
    orders: data.data.orders,
  };

  return ordersData;
};

export const OrderService = {
  fetchOrders,
};
