import apiClient from '@/lib/apiClient';
import { WishlistItem } from '@/types/Wishlist';
import { catchError } from '@/utils/catchError';

const getWishlist = async (): Promise<WishlistItem[]> => {
  try {
    const { data } = await apiClient.get('/wishlist');
    return data.data;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

const addWishlistItem = async (productId: string): Promise<WishlistItem> => {
  try {
    const { data } = await apiClient.post('/wishlist', { productId });
    return data.data;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

const removeWishlistItem = async (productId: string): Promise<void> => {
  try {
    return await apiClient.delete('/wishlist', { data: { productId } });
  } catch (error) {
    throw new Error(catchError(error));
  }
};

const WishlistService = {
  addWishlistItem,
  getWishlist,
  removeWishlistItem,
};

export default WishlistService;
