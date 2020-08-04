import { Cart } from 'types';
import { catchError } from 'utils/catchError';
import { setAuthToken } from 'utils/auth';
import apiClient from 'api/apiClient';

interface CartsData {
  carts: Cart[];
}

const fetchCarts = async (token: string): Promise<CartsData> => {
  try {
    setAuthToken(token);
    const { data } = await apiClient.get(`/carts`);
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
    const url = `/carts`;
    const data = { quantity, productId };
    return await apiClient.post(url, data);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

const removeCart = async (token: string, cartId: string): Promise<void> => {
  try {
    setAuthToken(token);
    const url = `/carts/${cartId}`;
    return await apiClient.delete(url, { params: { token } });
  } catch (error) {
    throw new Error(catchError(error));
  }
};

const updateCart = async (token: string, cartId: string, quantity: number): Promise<void> => {
  try {
    setAuthToken(token);
    const url = `/carts/${cartId}`;
    return await apiClient.patch(url, { quantity });
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
