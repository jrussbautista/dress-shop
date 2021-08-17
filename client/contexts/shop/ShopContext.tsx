import React, { createContext, useReducer, useContext } from 'react';

import { ProductService } from '@/services/ProductService';
import { Product } from '@/types';
import { PAGE_LIMIT } from '@/utils/constants';

import reducer from './shop-reducer';
import { LOAD_PRODUCTS } from './shop-types';

interface Context {
  products: Product[];
  isLoading: boolean;
  hasLoadMore: boolean;
  currentPage: number;
  loadProducts(): void;
}

const ShopContext = createContext<Context | undefined>(undefined);
ShopContext.displayName = 'ShopContext';

export const ShopProvider: React.FC = ({ children }) => {
  const initialState = {
    products: [],
    isLoading: true,
    hasLoadMore: true,
    currentPage: 1,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  async function loadProducts() {
    const payload = {
      params: { page: state.currentPage, limit: PAGE_LIMIT },
    };
    const data = await ProductService.fetchProducts(payload);
    dispatch({ type: LOAD_PRODUCTS, payload: data });
  }

  return <ShopContext.Provider value={{ ...state, loadProducts }}>{children}</ShopContext.Provider>;
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
