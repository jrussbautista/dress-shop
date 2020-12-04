import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from '../auth';
import reducer from './cartReducer';
import {
  ADD_CART,
  CLEAR_CART,
  REMOVE_CART,
  SET_CARTS,
  UPDATE_QUANTITY,
  SET_ERROR,
} from './cartTypes';
import { Cart, Product } from 'types';
import { CartService } from 'services';

interface InitialStateType {
  loading: boolean;
  error: null | string;
  carts: Cart[];
  cartsNum: number;
  addCart: (product: Product, quantity: number) => void;
  removeCart: (id: string) => void;
  clearCart: () => void;
  updateCartQty: (id: string, quantity: number) => void;
}

const initialState = {
  loading: true,
  error: null,
  carts: [],
  cartsNum: 0,
  addCart: () => null,
  removeCart: () => null,
  clearCart: () => null,
  updateCartQty: () => null,
};

const CartContext = createContext<InitialStateType>(initialState);

export const CartProvider: React.FC = ({ children }) => {
  const { currentUser, isAuthenticated } = useAuth();

  const initialState = {
    cartsNum: currentUser ? currentUser.carts.length : 0,
    carts: [],
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchCarts = async () => {
    try {
      const { carts } = await CartService.fetchCarts();
      dispatch({ type: SET_CARTS, payload: carts });
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: { error: error.message } });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCarts();
    } else {
      dispatch({ type: SET_ERROR, payload: { error: '' } });
    }
  }, [isAuthenticated]);

  const addCart = async (product: Product, quantity: number) => {
    const { cart } = await CartService.addCart(quantity, product._id);
    const cartItem: Cart = { _id: cart._id, quantity, product };
    dispatch({ type: ADD_CART, payload: { cart: cartItem } });
  };

  const removeCart = async (id: string) => {
    await CartService.removeCart(id);
    dispatch({ type: REMOVE_CART, payload: { id } });
  };

  const updateCartQty = async (id: string, quantity: number) => {
    await CartService.updateCart(id, quantity);
    dispatch({ type: UPDATE_QUANTITY, payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  return (
    <CartContext.Provider value={{ ...state, addCart, removeCart, clearCart, updateCartQty }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): InitialStateType => useContext(CartContext);
