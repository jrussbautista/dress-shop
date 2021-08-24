import { rest } from 'msw';

import { fakeCartItems } from '@/test/fake-data';
import { API_URL } from '@/utils/constants';

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
