import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { useAuth } from '../auth/authContext';
import reducer from './cartReducer';
import { ADD_CART, CLEAR_CART, REMOVE_CART, SET_CART } from './cartTypes';
import { AddCart, Cart } from '../../types';

interface InitialStateType {
  carts: string[];
  cartsNum: number;
  addCart: (cart: AddCart) => void;
  removeCart: (cartId: string) => void;
  clearCart: () => void;
}

const initialState = {
  carts: [],
  cartsNum: 0,
  addCart: () => {},
  removeCart: () => {},
  clearCart: () => {},
};

const CartContext = createContext<InitialStateType>(initialState);

const CartProvider: React.FC = ({ children }) => {
  const { currentUser } = useAuth();

  const initialState = {
    cartsNum: currentUser ? currentUser.carts.length : 0,
    carts: currentUser ? currentUser.carts : [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const addCart = (cart: AddCart) => {
    dispatch({ type: ADD_CART, payload: cart });
  };

  const removeCart = (productId: string) => {
    dispatch({ type: REMOVE_CART, payload: productId });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  return (
    <CartContext.Provider value={{ ...state, addCart, removeCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
