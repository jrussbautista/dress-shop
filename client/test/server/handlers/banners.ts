import { rest } from 'msw';

import { API_URL } from '@/constants';
import { bannerGenerator } from '@/test/data-generators';

export const bannersHandlers = [
  rest.get(`${API_URL}/banners`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [bannerGenerator(), bannerGenerator()],
      })
    );
  }),
];
