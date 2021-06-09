import { CartItem } from 'types';

export const removeCartItemToCart = (
  cartItems: CartItem[],
  cartItemToRemove: CartItem
): CartItem[] => {
  return cartItems.filter((cartItem) => cartItem._id !== cartItemToRemove._id);
};

export const addCartItemToCart = (cartItems: CartItem[], cartItemToAdd: CartItem): CartItem[] => {
  const isItemExist = cartItems.some((cartItem) => cartItem._id === cartItemToAdd._id);
  if (isItemExist) {
    return cartItems.map((cartItem) =>
      cartItem._id === cartItemToAdd._id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [cartItemToAdd, ...cartItems];
};

export const updateCartItemQuantityToCart = (
  cartItems: CartItem[],
  cartItemToUpdate: CartItem,
  newQuantity: number
): CartItem[] => {
  return cartItems.map((cartItem) =>
    cartItem._id === cartItemToUpdate._id ? { ...cartItem, quantity: newQuantity } : cartItem
  );
};
