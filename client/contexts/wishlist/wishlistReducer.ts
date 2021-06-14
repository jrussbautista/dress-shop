import { addWishlistItem, removeWishlistItem } from './wishlistUtils';
import { SET_WISHLIST_ITEMS, ADD_WISHLIST_ITEM, REMOVE_WISHLIST_ITEM } from './wishlistTypes';
import { WishlistItem } from './../../types/Wishlist';

type State = {
  wishlistItems: WishlistItem[];
  loading: boolean;
  error: null | string;
};

type Action = {
  type: string;
  payload?: any;
};

export default (state: State, action: Action): State => {
  switch (action.type) {
    case SET_WISHLIST_ITEMS:
      return {
        ...state,
        wishlistItems: action.payload,
        loading: false,
        error: null,
      };
    case ADD_WISHLIST_ITEM:
      return {
        ...state,
        wishlistItems: addWishlistItem(state.wishlistItems, action.payload),
      };
    case REMOVE_WISHLIST_ITEM:
      return {
        ...state,
        wishlistItems: removeWishlistItem(state.wishlistItems, action.payload),
      };
    default:
      return state;
  }
};
