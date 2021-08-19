import { rest } from 'msw';

import { API_URL } from '@/utils/constants';

export const wishlistHandlers = [
  rest.get(`${API_URL}/wishlist`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [],
      })
    );
  }),
];
