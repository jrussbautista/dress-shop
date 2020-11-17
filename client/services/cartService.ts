import { Cart } from 'types';
import { catchError } from 'utils/catchError';
import apiClient from 'utils/apiClient';

interface CartsData {
  carts: Cart[];
}

interface AddCart {
  cart: Cart;
}

const fetchCarts = async (): Promise<CartsData> => {
  try {
    const { data } = await apiClient.get(`/carts`);
    const cartsData: CartsData = {
      carts: data.data.carts,
    };
    return cartsData;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

const addCart = async (quantity: number, productId: string): Promise<AddCart> => {
  try {
    const url = `/carts`;
    const payload = { quantity, productId };
    const { data } = await apiClient.post(url, payload);
    return {
      cart: data.data.cart,
    };
  } catch (error) {
    throw new Error(catchError(error));
  }
};

const removeCart = async (cartId: string): Promise<void> => {
  try {
    const url = `/carts/${cartId}`;
    return await apiClient.delete(url);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

const updateCart = async (cartId: string, quantity: number): Promise<void> => {
  try {
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
