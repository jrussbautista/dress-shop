import { Cart, CartItem } from '@/types';
import { catchError } from '@/utils/catchError';
import apiClient from '@/utils/apiClient';

const getCart = async (): Promise<Cart> => {
  try {
    const { data } = await apiClient.get(`/cart`);
    return data.data;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

const addCartItem = async (quantity: number, productId: string): Promise<CartItem> => {
  try {
    const url = `/cart`;
    const payload = { quantity, productId };
    const { data } = await apiClient.post(url, payload);
    return data.data;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

const removeCartItem = async (productId: string): Promise<void> => {
  try {
    return await apiClient.delete('/cart', { data: { productId } });
  } catch (error) {
    throw new Error(catchError(error));
  }
};

const updateQuantityCarItem = async (productId: string, quantity: number): Promise<void> => {
  try {
    return await apiClient.put('/cart', { productId, quantity });
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const CartService = {
  getCart,
  addCartItem,
  removeCartItem,
  updateQuantityCarItem,
};
