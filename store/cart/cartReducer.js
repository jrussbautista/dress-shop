import { ADD_CART, REMOVE_CART, SET_CART, CLEAR_CART } from './cartTypes';

export default (state, action) => {
  switch (action.type) {
    case CLEAR_CART:
      return { ...state, carts: [] };
    case SET_CART:
      return { ...state, carts: action.payload, loading: false };
    case ADD_CART:
      // check if new added cart is exist on cart
      const isCartExist = state.carts.find(
        cart => cart.product._id === action.payload.product._id
      );
      if (isCartExist) {
        // add 1 to cart quantity
        const carts = state.carts.map(cart =>
          cart.id === action.payload.product._id
            ? { ...cart, quantity: cart.quantity + 1 }
            : cart
        );
        return { ...state, carts };
      } else {
        return { ...state, carts: [...state.carts, action.payload] };
      }
    case REMOVE_CART:
      const filteredCarts = state.carts.filter(
        cart => cart._id !== action.payload
      );
      return { ...state, carts: filteredCarts };
    default:
      return state;
  }
};
