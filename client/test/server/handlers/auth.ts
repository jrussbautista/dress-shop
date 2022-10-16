import { rest } from 'msw';

import { API_URL } from '@/constants';
import { userGenerator } from '@/test/data-generators';

export const authHandlers = [
  rest.get(`${API_URL}/auth/me`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          token: 'test_token',
          user: userGenerator(),
        },
      })
    );
  }),
  rest.post(`${API_URL}/auth/login`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          token: 'test_token',
          user: userGenerator(),
        },
      })
    );
  }),
  rest.post(`${API_URL}/auth/signup`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          token: 'test_token',
          user: userGenerator(),
        },
      })
    );
  }),
];
