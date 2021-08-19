import { rest } from 'msw';

import { categoryGenerator } from '@/test/data-generators';
import { API_URL } from '@/utils/constants';

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
