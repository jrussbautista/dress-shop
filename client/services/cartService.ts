import axios from 'axios';
import { API_URL } from '../utils/constants';
import { Carts } from '../types';

const fetchCarts = async (token: string): Promise<Carts> => {
  const { data } = await axios.get(`${API_URL}/carts`, { params: { token } });
  const cartsData = {
    carts: data.data.carts,
  };
  return cartsData;
};

const addCart = async (token: string, quantity: number, productId: string) => {
  const url = `${API_URL}/carts`;
  const data = { quantity, productId };
  return await axios.post(url, data, { params: { token } });
};

const removeCart = async (token: string, cartId: string) => {
  const url = `${API_URL}/carts/${cartId}`;
  return await axios.delete(url, { params: { token } });
};

export const CartService = {
  fetchCarts,
  addCart,
  removeCart,
};
