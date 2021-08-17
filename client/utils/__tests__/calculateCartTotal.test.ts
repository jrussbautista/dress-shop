import { CartItem } from '@/types';

import calculateCartTotal from '../calculateCartTotal';

import { cartItemGenerator } from './../../test/data-generators';

test('calculate cart total works correctly', () => {
  const fakeCartItems1: CartItem[] = [
    cartItemGenerator({ quantity: 1 }, { price: 200 }),
    cartItemGenerator({ quantity: 1 }, { price: 200 }),
    cartItemGenerator({ quantity: 1 }, { price: 200 }),
  ];

  const fakeCartItems2: CartItem[] = [
    cartItemGenerator({ quantity: 2 }, { price: 500 }),
    cartItemGenerator({ quantity: 3 }, { price: 500 }),
    cartItemGenerator({ quantity: 10 }, { price: 500 }),
  ];

  expect(calculateCartTotal(fakeCartItems1)).toEqual({
    cartTotal: 600,
    stripeTotal: 60000,
  });

  expect(calculateCartTotal(fakeCartItems2)).toEqual({
    cartTotal: 7500,
    stripeTotal: 750000,
  });
});
