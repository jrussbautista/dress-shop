import { rest } from 'msw';

import { API_URL } from '@/constants';

export const productsHandlers = [
  rest.get(`${API_URL}/products`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        products: [],
        total: 0,
      })
    );
  }),
];
