import axios from 'axios';
import cookie from 'js-cookie';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import baseURL from '../../utils/baseURL';
import { useAuth } from '../auth/authContext';
import reducer from './cartReducer';
import { ADD_CART, CLEAR_CART, REMOVE_CART, SET_CART } from './cartTypes';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const initialState = {
    carts: [],
    loading: true
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { currentUser } = useAuth();

  useEffect(() => {
    const getUserCart = async () => {
      try {
        const token = cookie.get('token');
        const payload = { headers: { Authorization: token } };
        const { data } = await axios.get(`${baseURL}/api/cart`, payload);
        if (data.carts) {
          dispatch({ type: SET_CART, payload: data.carts });
        } else {
          dispatch({ type: SET_CART, payload: [] });
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser) getUserCart();
  }, [currentUser]);

  const addCart = async cart => {
    dispatch({ type: ADD_CART, payload: cart });
    try {
      const token = cookie.get('token');
      const headers = { headers: { Authorization: token } };
      const data = { quantity: cart.quantity, productId: cart.product._id };
      const res = await axios.post(`${baseURL}/api/cart`, data, headers);
    } catch (error) {
      console.log(error);
    }
  };

  const removeCart = async cartId => {
    dispatch({ type: REMOVE_CART, payload: cartId });
    try {
      const token = cookie.get('token');
      const payload = { params: { cartId }, headers: { Authorization: token } };
      const res = await axios.delete(`${baseURL}/api/cart`, payload);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  return (
    <CartContext.Provider
      value={{
        carts: state.carts,
        addCart,
        removeCart,
        clearCart,
        loading: state.loading
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
