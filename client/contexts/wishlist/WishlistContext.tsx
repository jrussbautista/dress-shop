import React, { createContext, useContext, useEffect, useReducer } from 'react';

import { WishlistService } from '@/services/WishlistService';
import { WishlistItem } from '@/types/Wishlist';
import { useAuth } from 'contexts/auth';

import reducer from './wishlist-reducer';
import { ADD_WISHLIST_ITEM, REMOVE_WISHLIST_ITEM, SET_WISHLIST_ITEMS } from './wishlist-types';

interface InitialState {
  wishlistItems: WishlistItem[];
  loading: boolean;
  error: null | string;
  addWishlistItem: (productId: string) => void;
  removeWishlistItem: (productId: string) => void;
}

const initialState = {
  wishlistItems: [],
  loading: true,
  error: null,
};

const WishlistContext = createContext<InitialState>({
  ...initialState,
  addWishlistItem: () => null,
  removeWishlistItem: () => null,
});

export const WishlistProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { isAuthenticated } = useAuth();

  const fetchWishlist = async () => {
    try {
      const results = await WishlistService.getWishlist();
      dispatch({ type: SET_WISHLIST_ITEMS, payload: results });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    }
  }, [isAuthenticated]);

  const addWishlistItem = async (productId: string) => {
    const results = await WishlistService.addWishlistItem(productId);
    dispatch({ type: ADD_WISHLIST_ITEM, payload: results });
  };

  const removeWishlistItem = async (productId: string) => {
    await WishlistService.removeWishlistItem(productId);
    dispatch({ type: REMOVE_WISHLIST_ITEM, payload: productId });
  };

  return (
    <WishlistContext.Provider value={{ ...state, addWishlistItem, removeWishlistItem }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
