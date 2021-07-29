import { CartItem } from 'types';

import {
  ADD_CART,
  REMOVE_CART,
  SET_CARTS,
  CLEAR_CART,
  UPDATE_QUANTITY,
  SET_ERROR,
} from './cart-types';
import {
  removeCartItemToCart,
  addCartItemToCart,
  updateCartItemQuantityToCart,
} from './cart-utils';

type State = {
  cartItems: CartItem[];
  loading: boolean;
  error: null | string;
};

type Action = {
  type: string;
  payload?: any;
};

const cartReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case CLEAR_CART:
      return { ...state, cartItems: [] };
    case SET_CARTS:
      return {
        ...state,
        cartItems: action.payload,
        loading: false,
        error: null,
      };
    case ADD_CART: {
      return {
        ...state,
        cartItems: addCartItemToCart(state.cartItems, action.payload),
      };
    }
    case REMOVE_CART: {
      return { ...state, cartItems: removeCartItemToCart(state.cartItems, action.payload) };
    }

    case UPDATE_QUANTITY: {
      return {
        ...state,
        cartItems: updateCartItemQuantityToCart(
          state.cartItems,
          action.payload.cartItem,
          action.payload.newQuantity
        ),
      };
    }

    case SET_ERROR: {
      return { ...state, error: action.payload.error, loading: false };
    }

    default:
      return state;
  }
};

export default cartReducer;
