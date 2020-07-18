import { ADD_CART, REMOVE_CART, SET_CART, CLEAR_CART } from './cartTypes';
import { Cart } from '../../types';

type State = {
  carts: Cart[];
  cartsNum: number;
};

type Action = {
  type: string;
  payload?: any;
};

export default (state: State, action: Action) => {
  switch (action.type) {
    case CLEAR_CART:
      return { ...state, carts: [] };
    case SET_CART:
      return { ...state, carts: action.payload, loading: false };
    case ADD_CART:
      // check if new added cart is exist on cart
      const isCartExist = state.carts.some(
        (cart) => cart === action.payload.product._id
      );

      if (isCartExist) {
        return state;
      } else {
        return {
          ...state,
          carts: [...state.carts, action.payload.product._id],
          cartsNum: state.cartsNum + 1,
        };
      }

    case REMOVE_CART:
      const filteredCarts = state.carts.filter(
        (cart) => cart !== action.payload
      );
      return { ...state, carts: filteredCarts, cartsNum: state.cartsNum - 1 };
    default:
      return state;
  }
};
