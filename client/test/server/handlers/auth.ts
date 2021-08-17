import { rest } from 'msw';

import { fakeUser } from '@/test/fake-data';
import { API_URL } from '@/utils/constants';

export const authHandlers = [
  rest.get(`${API_URL}/auth/me`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          token: '',
          user: fakeUser,
        },
      })
    );
  }),
];
