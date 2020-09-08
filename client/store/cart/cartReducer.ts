import {
  ADD_CART,
  REMOVE_CART,
  SET_CARTS,
  CLEAR_CART,
  UPDATE_QUANTITY,
  SET_ERROR,
} from './cartTypes';
import { Cart } from 'types';

type State = {
  carts: Cart[];
  cartsNum: number;
  loading: boolean;
  error: null | string;
};

type Action = {
  type: string;
  payload?: any;
};

export default (state: State, action: Action): State => {
  switch (action.type) {
    case CLEAR_CART:
      return { ...state, carts: [], cartsNum: 0 };
    case SET_CARTS:
      return {
        ...state,
        carts: action.payload,
        cartsNum: action.payload.length,
        loading: false,
        error: null,
      };
    case ADD_CART: {
      // check if new added cart is exist on cart
      const isCartExist = state.carts.some((cart) => cart._id === action.payload.cart._id);

      if (isCartExist) {
        const newCarts = state.carts.map((cart) =>
          cart._id === action.payload.cart._id
            ? { ...cart, quantity: cart.quantity + action.payload.cart.quantity }
            : cart
        );
        return { ...state, carts: newCarts };
      } else {
        return {
          ...state,
          carts: [...state.carts, action.payload.cart],
          cartsNum: state.cartsNum + 1,
        };
      }
    }
    case REMOVE_CART: {
      const filteredCarts = state.carts.filter((cart) => cart._id !== action.payload.id);
      return { ...state, carts: filteredCarts, cartsNum: state.cartsNum - 1 };
    }

    case UPDATE_QUANTITY: {
      const updateCartsQty = state.carts.map((cart) =>
        cart._id === action.payload.id ? { ...cart, quantity: action.payload.quantity } : cart
      );
      return { ...state, carts: updateCartsQty };
    }

    case SET_ERROR: {
      return { ...state, error: action.payload.error, loading: false };
    }

    default:
      return state;
  }
};
