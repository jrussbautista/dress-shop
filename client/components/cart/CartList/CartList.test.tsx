import { rest } from 'msw';
import { setCookie, destroyCookie } from 'nookies';

import { API_URL } from '@/constants';
import { fakeCartItems } from '@/test/fake-data';
import { server } from '@/test/server';
import { render, screen, waitForElementToBeRemoved, within } from '@/test/test-utils';
import formatPrice from '@/utils/formatPrice';

import CartList from './CartList';

beforeEach(() => {
  setCookie({}, 'token', 'fake_user_token', {});
});

afterEach(() => {
  destroyCookie({}, 'token');
});

test('successfully fetched cart items and renders correctly', async () => {
  render(<CartList />);

  expect(screen.getByLabelText('Cart loading')).toBeInTheDocument();

  await waitForElementToBeRemoved(() => screen.getByLabelText('Cart loading'));

  const cartListItems = screen.getAllByRole('listitem');
  expect(cartListItems.length).toBe(3);

  cartListItems.forEach((cartItem, index) => {
    const utils = within(cartItem);
    const result = fakeCartItems[index];

    expect(utils.getByAltText(result.product.name)).toBeInTheDocument();
    expect(utils.getByAltText(result.product.name)).toHaveAttribute('src');
    expect(utils.getByText(result.product.name)).toBeInTheDocument();
    expect(utils.getByText(result.product.name)).toHaveAttribute(
      'href',
      `/products/${result.product._id}`
    );
    expect(utils.getByLabelText('Product price')).toHaveTextContent(
      formatPrice(result.product.price)
    );
  });
});

test('show error message on failure fetching cart items', async () => {
  server.use(
    rest.get(`${API_URL}/cart`, (_, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<CartList />);

  expect(screen.getByLabelText('Cart loading')).toBeInTheDocument();

  await waitForElementToBeRemoved(() => screen.getByLabelText('Cart loading'));

  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"Cannot fetch cart at this moment. Please try again"`
  );
});
