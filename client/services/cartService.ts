import axios from 'axios';
import { API_URL } from 'utils/constants';
import { Cart } from 'types';
import { catchError } from 'utils/catchError';
import { setAuthToken } from 'utils/auth';

interface CartsData {
  carts: Cart[];
}

const fetchCarts = async (token: string): Promise<CartsData> => {
  try {
    setAuthToken(token);
    const { data } = await axios.get(`${API_URL}/carts`);
    const cartsData: CartsData = {
      carts: data.data.carts,
    };
    return cartsData;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

const addCart = async (token: string, quantity: number, productId: string): Promise<void> => {
  try {
    setAuthToken(token);
    const url = `${API_URL}/carts`;
    const data = { quantity, productId };
    return await axios.post(url, data);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

const removeCart = async (token: string, cartId: string): Promise<void> => {
  try {
    setAuthToken(token);
    const url = `${API_URL}/carts/${cartId}`;
    return await axios.delete(url, { params: { token } });
  } catch (error) {
    throw new Error(catchError(error));
  }
};

const updateCart = async (token: string, cartId: string, quantity: number): Promise<void> => {
  try {
    setAuthToken(token);
    const url = `${API_URL}/carts/${cartId}`;
    return await axios.patch(url, { quantity });
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
