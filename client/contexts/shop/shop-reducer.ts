import { Product } from 'types';

import { LOAD_PRODUCTS, LOAD_MORE_PRODUCTS, SET_INITIAL_PRODUCTS } from './shop-types';

type State = {
  products: Product[];
  currentPage: number;
  isLoading: boolean;
  hasLoadMore: boolean;
};

type Action = {
  type: string;
  payload?: any;
};

const shopReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_INITIAL_PRODUCTS: {
      return {
        ...state,
        products: action.payload,
        isLoading: false,
      };
    }
    case LOAD_PRODUCTS: {
      return {
        ...state,
        products: action.payload.products,
        isLoading: false,
      };
    }
    case LOAD_MORE_PRODUCTS: {
      const products = action.payload.products;
      const newProducts = state.products.concat(products);
      const totalProducts = action.payload.total;
      const hasLoadMore = newProducts.length < totalProducts;

      return {
        ...state,
        products: newProducts,
        hasLoadMore,
        currentPage: state.currentPage + 1,
      };
    }
    default:
      return state;
  }
};

export default shopReducer;
