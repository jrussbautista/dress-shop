import axios from 'axios';
import { API_URL } from '../utils/constants';
import { Carts } from '../types';
import { catchError } from '../utils/catchError';

interface CartsData {
  carts: Carts;
}

const fetchCarts = async (token: string): Promise<CartsData> => {
  try {
    const { data } = await axios.get(`${API_URL}/carts`, { params: { token } });
    const cartsData: CartsData = {
      carts: data.data.carts,
    };
    return cartsData;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

const addCart = async (token: string, quantity: number, productId: string) => {
  try {
    const url = `${API_URL}/carts`;
    const data = { quantity, productId };
    return await axios.post(url, data, { params: { token } });
  } catch (error) {
    throw new Error(catchError(error));
  }
};

const removeCart = async (token: string, cartId: string) => {
  try {
    const url = `${API_URL}/carts/${cartId}`;
    return await axios.delete(url, { params: { token } });
  } catch (error) {
    throw new Error(catchError(error));
  }
};

const updateCart = async (token: string, cartId: string, quantity: number) => {
  try {
    const url = `${API_URL}/carts/${cartId}`;
    return await axios.patch(url, { quantity }, { params: { token } });
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const CartService = {
  fetchCarts,
  addCart,
  removeCart,
  updateCart,
};
