import { rest } from 'msw';

import { bannerGenerator } from '@/test/data-generators';
import { API_URL } from '@/utils/constants';

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
