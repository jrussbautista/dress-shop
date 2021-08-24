import { cartItemGenerator } from '@/test/data-generators';
import { render, screen } from '@/test/test-utils';
import formatPrice from '@/utils/formatPrice';

import CartItem from './CartItem';

test('renders cart item information correctly', () => {
  const fakeCartItem = cartItemGenerator({ quantity: 2 }, { price: 500 });

  render(<CartItem cartItem={fakeCartItem} />);

  const productName = screen.getByText(fakeCartItem.product.name);
  const productPrice = screen.getByText(formatPrice(fakeCartItem.product.price));
  const productImage = screen.getByAltText(fakeCartItem.product.name);
  const cartTotal = screen.getByLabelText('Product price total');

  expect(productName).toBeInTheDocument();
  expect(productPrice).toBeInTheDocument();
  expect(productImage).toBeInTheDocument();
  expect(productImage).toHaveAttribute('src', fakeCartItem.product.imageURL);
  expect(cartTotal).toHaveTextContent('P1,000');
});
