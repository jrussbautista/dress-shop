import React, { createContext, useContext, useReducer } from 'react';
import { useAuth } from '../auth/authContext';
import reducer from './cartReducer';
import { ADD_CART, CLEAR_CART, REMOVE_CART } from './cartTypes';
import { AddCart } from 'types';

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
  addCart: () => null,
  removeCart: () => null,
  clearCart: () => null,
};

const CartContext = createContext<InitialStateType>(initialState);

export const CartProvider: React.FC = ({ children }) => {
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

export const useCart = (): InitialStateType => useContext(CartContext);
