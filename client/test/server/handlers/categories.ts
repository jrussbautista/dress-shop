import { rest } from 'msw';

import { API_URL } from '@/constants';
import { categoryGenerator } from '@/test/data-generators';

export const categoriesHandlers = [
  rest.get(`${API_URL}/categories`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [categoryGenerator(), categoryGenerator()],
      })
    );
  }),
];
