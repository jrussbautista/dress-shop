import { rest } from 'msw';

import { fakeBanners } from '@/test/fake-data';
import { API_URL } from '@/utils/constants';

export const bannersHandlers = [
  rest.get(`${API_URL}/banners`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: fakeBanners,
      })
    );
  }),
];
