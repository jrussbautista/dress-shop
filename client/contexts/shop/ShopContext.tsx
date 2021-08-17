import React, { createContext, useReducer, useContext } from 'react';

import { ProductService } from '@/services/ProductService';
import { Product } from '@/types';
import { PAGE_LIMIT } from '@/utils/constants';

import reducer from './shop-reducer';
import { LOAD_PRODUCTS, LOAD_MORE_PRODUCTS, SET_INITIAL_PRODUCTS } from './shop-types';

interface Context {
  products: Product[];
  isLoading: boolean;
  hasLoadMore: boolean;
  currentPage: number;
  loadProducts(): Promise<void>;
  loadMoreProducts(): Promise<void>;
  setInitialProducts(products: Product[]): void;
}

const ShopContext = createContext<Context | undefined>(undefined);
ShopContext.displayName = 'ShopContext';

export const ShopProvider: React.FC = ({ children }) => {
  const initialState = {
    products: [],
    isLoading: true,
    hasLoadMore: true,
    currentPage: 2,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const loadProducts = async () => {
    const payload = {
      params: { page: state.currentPage, limit: PAGE_LIMIT },
    };
    const data = await ProductService.getProducts(payload);
    dispatch({ type: LOAD_PRODUCTS, payload: data });
  };

  const loadMoreProducts = async () => {
    const payload = {
      params: { page: state.currentPage, limit: PAGE_LIMIT },
    };
    const data = await ProductService.getProducts(payload);
    dispatch({ type: LOAD_MORE_PRODUCTS, payload: data });
  };

  const setInitialProducts = (products: Product[]) => {
    dispatch({ type: SET_INITIAL_PRODUCTS, payload: products });
  };

  return (
    <ShopContext.Provider value={{ ...state, loadProducts, loadMoreProducts, setInitialProducts }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
