import React, { createContext, useReducer, useContext } from 'react';
import reducer from './shopReducer';
import { LOAD_PRODUCTS, LOAD_MORE_PRODUCTS } from './shopTypes';
import axios from 'axios';
import baseURL from '../../utils/baseURL';

const ShopContext = createContext();

const ShopProvider = ({ children }) => {
  const initState = {
    products: [],
    isLoading: true,
    hasLoadMore: false,
    currentPage: 1
  };

  const [state, dispatch] = useReducer(reducer, initState);

  async function fetchProducts(page) {
    const payload = { params: { page, limit: 5 } };
    const { data } = await axios.get(`${baseURL}/api/products`, payload);
    return data;
  }

  async function loadProducts() {
    const data = await fetchProducts(state.currentPage);
    dispatch({ type: LOAD_PRODUCTS, payload: data });
  }

  async function loadMore() {
    const data = await fetchProducts(state.currentPage + 1);
    dispatch({ type: LOAD_MORE_PRODUCTS, payload: data });
  }

  return (
    <ShopContext.Provider
      value={{
        ...state,
        loadProducts,
        loadMore
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

const useShop = () => useContext(ShopContext);

export { ShopProvider, useShop };
