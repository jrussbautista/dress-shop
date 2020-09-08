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
import { Cart } from 'types';
import { CartService } from 'services';

interface InitialStateType {
  loading: boolean;
  error: null | string;
  carts: Cart[];
  cartsNum: number;
  addCart: (cart: Cart) => void;
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

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const { carts } = await CartService.fetchCarts();
        dispatch({ type: SET_CARTS, payload: carts });
      } catch (error) {
        dispatch({ type: SET_ERROR, payload: { error: error.message } });
      }
    };

    if (isAuthenticated) {
      fetchCarts();
    } else {
      dispatch({ type: SET_ERROR, payload: { error: '' } });
    }
  }, [isAuthenticated]);

  const addCart = (cart: Cart) => {
    dispatch({ type: ADD_CART, payload: { cart } });
  };

  const removeCart = (id: string) => {
    dispatch({ type: REMOVE_CART, payload: { id } });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const updateCartQty = (id: string, quantity: number) => {
    dispatch({ type: UPDATE_QUANTITY, payload: { id, quantity } });
  };

  return (
    <CartContext.Provider value={{ ...state, addCart, removeCart, clearCart, updateCartQty }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): InitialStateType => useContext(CartContext);
