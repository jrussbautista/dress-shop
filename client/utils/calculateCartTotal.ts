import { Product } from 'types';

type Cart = {
  product: Product;
  quantity: number;
};

export default function calculateCartTotal(
  carts: Cart[]
): { cartTotal: number; stripeTotal: number } {
  const total = carts.reduce((acc, el) => acc + el.product.price * el.quantity, 0);
  const cartTotal = parseFloat(total.toFixed(2));
  const stripeTotal = Number((total * 100).toFixed(2));
  return { cartTotal, stripeTotal };
}
