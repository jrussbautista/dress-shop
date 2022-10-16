import { rest } from 'msw';

import { API_URL } from '@/constants';
import { fakeCartItems } from '@/test/fake-data';

export const cartHandlers = [
  rest.get(`${API_URL}/cart`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          items: fakeCartItems,
        },
      })
    );
  }),
];
