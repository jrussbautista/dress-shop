import { cartItemGenerator } from '@/test/data-generators';
import { render, screen } from '@/test/test-utils';

import CartList from './CartList';

test('renders list of cart items', () => {
  const fakeCartItems = [cartItemGenerator(), cartItemGenerator(), cartItemGenerator()];

  render(<CartList cartItems={fakeCartItems} />);

  const cartItems = screen.getAllByRole('listitem');

  expect(cartItems.length).toBe(fakeCartItems.length);

  fakeCartItems.forEach((cartItem) => {
    expect(screen.getByText(cartItem.product.name)).toBeInTheDocument();
    expect(screen.getByAltText(cartItem.product.name)).toBeInTheDocument();
    expect(screen.getByAltText(cartItem.product.name)).toHaveAttribute(
      'src',
      cartItem.product.imageURL
    );
  });
});
