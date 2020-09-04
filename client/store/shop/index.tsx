import React, { createContext, useReducer, useContext } from 'react';
import { LOAD_PRODUCTS } from './shopTypes';
import { ProductService } from 'services/productService';
import { Product } from 'types';
import { PAGE_LIMIT } from 'utils/constants';
import reducer from './shopReducer';

interface InitialStateType {
  products: Product[];
  isLoading: boolean;
  hasLoadMore: boolean;
  currentPage: number;
  loadProducts(): void;
}

const initialState = {
  products: [],
  isLoading: true,
  hasLoadMore: true,
  currentPage: 1,
  loadProducts: () => null,
};

const ShopContext = createContext<InitialStateType>(initialState);

export const ShopProvider: React.FC = ({ children }) => {
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

export const useShop = (): InitialStateType => useContext(ShopContext);
