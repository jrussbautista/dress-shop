export default function calculateCartTotal(carts) {
  const total = carts.reduce(
    (acc, el) => acc + el.product.price * el.quantity,
    0
  );
  return parseFloat(total).toFixed(2);
}
