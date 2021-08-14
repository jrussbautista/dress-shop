import React, { createContext, useContext, useReducer, useEffect } from 'react';

import { useAuth } from '../auth';

import reducer from './cart-reducer';
import {
  ADD_CART,
  CLEAR_CART,
  REMOVE_CART,
  SET_CARTS,
  UPDATE_QUANTITY,
  SET_ERROR,
} from './cart-types';

import { CartService } from '@/services';
import { CartItem, Product } from '@/types';

interface InitialStateType {
  loading: boolean;
  error: null | string;
  cartItems: CartItem[];
  addCartItem: (product: Product, quantity: number) => void;
  removeCartItem: (cartItemToRemove: CartItem) => void;
  clearCart: () => void;
  updateCartItemQty: (cartItem: CartItem, newQuantity: number) => void;
}

const initialState = {
  loading: true,
  error: null,
  cartItems: [],
};

const CartContext = createContext<InitialStateType>({
  ...initialState,
  addCartItem: () => null,
  removeCartItem: () => null,
  clearCart: () => null,
  updateCartItemQty: () => null,
});

export const CartProvider: React.FC = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const initialState = {
    cartItems: [],
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchCarts = async () => {
    try {
      const results = await CartService.getCart();
      dispatch({ type: SET_CARTS, payload: results.items });
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: { error: error.message } });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCarts();
    }
  }, [isAuthenticated]);

  const addCartItem = async (product: Product, quantity: number) => {
    const results = await CartService.addCartItem(quantity, product._id);
    const cartItem: CartItem = { _id: results._id, quantity, product };
    dispatch({ type: ADD_CART, payload: cartItem });
  };

  const removeCartItem = async (cartItem: CartItem) => {
    await CartService.removeCartItem(cartItem.product._id);
    dispatch({ type: REMOVE_CART, payload: cartItem });
  };

  const updateCartItemQty = async (cartItem: CartItem, newQuantity: number) => {
    await CartService.updateQuantityCarItem(cartItem.product._id, newQuantity);
    dispatch({ type: UPDATE_QUANTITY, payload: { cartItem, newQuantity } });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  return (
    <CartContext.Provider
      value={{ ...state, addCartItem, removeCartItem, clearCart, updateCartItemQty }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): InitialStateType => useContext(CartContext);
