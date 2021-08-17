import { CartItem } from 'types';

export default function calculateCartTotal(cartItems: CartItem[]): {
  cartTotal: number;
  stripeTotal: number;
} {
  const total = cartItems.reduce(
    (prev, current) => prev + current.product.price * current.quantity,
    0
  );
  const cartTotal = parseFloat(total.toFixed(2));
  const stripeTotal = Number((total * 100).toFixed(2));
  return { cartTotal, stripeTotal };
}
