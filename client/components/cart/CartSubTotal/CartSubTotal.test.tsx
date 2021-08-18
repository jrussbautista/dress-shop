import { render, screen } from '@/test/test-utils';
import formatPrice from '@/utils/formatPrice';

import CartSubTotal from './CartSubTotal';

test('renders cart subtotal correctly', () => {
  const fakeTotal = 1000;

  render(<CartSubTotal total={fakeTotal} />);

  const totalPrice = screen.getByText(formatPrice(fakeTotal));

  expect(totalPrice).toBeInTheDocument();
});
