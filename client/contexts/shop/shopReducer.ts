import { LOAD_PRODUCTS } from './shopTypes';
import { Product } from 'types';

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

export default (state: State, action: Action): State => {
  switch (action.type) {
    case LOAD_PRODUCTS: {
      const products = action.payload.products;
      const newProducts = state.products.concat(products);
      const totalProducts = action.payload.total;
      const hasLoadMore = newProducts.length < totalProducts;

      return {
        ...state,
        products: newProducts,
        isLoading: false,
        hasLoadMore,
        currentPage: state.currentPage + 1,
      };
    }
    default:
      return state;
  }
};
