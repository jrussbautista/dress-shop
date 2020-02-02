import React, { createContext, useState, useReducer } from 'react';
import reducer from './shopReducer';

const ShopContext = createContext();

const ShopProvider = ({ children }) => {
  const initState = {
    products: [],
    isLoading: true
  };

  const [state, dispatch] = useReducer(reducer, initState);

  async function loadProducts() {
    console.log('load products');
  }

  return (
    <ShopContext.Provider value={{ products: state.products, loadProducts }}>
      {children}
    </ShopContext.Provider>
  );
};

export { ShopProvider };
