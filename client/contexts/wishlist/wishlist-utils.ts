import { WishlistItem } from '../../types/Wishlist';

export const addWishlistItem = (
  wishlistItems: WishlistItem[],
  wishlistItemToAdd: WishlistItem
): WishlistItem[] => {
  return [...wishlistItems, wishlistItemToAdd];
};

export const removeWishlistItem = (
  wishlistItems: WishlistItem[],
  wishlistItemIdToRemove: string
): WishlistItem[] => {
  return wishlistItems.filter(
    (wishlistItem) => wishlistItem.product._id !== wishlistItemIdToRemove
  );
};
