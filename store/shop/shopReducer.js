import { LOAD_PRODUCTS, LOAD_MORE_PRODUCTS } from './shopTypes';

export default (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      const initialProduct = action.payload.products;
      const totalProducts = action.payload.totalProducts;
      const hasLoadMore = initialProduct.length < totalProducts;
      return {
        ...state,
        products: initialProduct,
        isLoading: false,
        hasLoadMore
      };
    case LOAD_MORE_PRODUCTS:
      const newProducts = state.products.concat(action.payload.products);
      return {
        ...state,
        products: newProducts,
        isLoading: false,
        hasLoadMore: newProducts.length < totalProducts
      };
    default:
      return state;
  }
};
