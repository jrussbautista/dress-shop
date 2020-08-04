import Router from 'next/router';
import { setCookie } from 'nookies';
import { NextPageContext } from 'next';
import apiClient from 'api/apiClient';

// handle auto login when created an account, and login
export const autoLogin = (token: string, location: string): void => {
  setCookie({}, 'token', token, {});
  Router.push(location);
};

export const redirectUser = (ctx: NextPageContext, location: string): void => {
  if (ctx.req && ctx.res) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
};

export const protectedRoutes = (pathname: string): boolean => {
  const protectedRoutes = ['/profile', '/checkout', '/order'];

  if (protectedRoutes.includes(pathname)) {
    return true;
  }

  return false;
};

export const checkProtectedRoutes = (ctx: NextPageContext): void => {
  const isProtectedRoutes = protectedRoutes(ctx.pathname);
  if (isProtectedRoutes) {
    redirectUser(ctx, '/auth?type=login');
  }
};

export const setAuthToken = (token: string): void => {
  apiClient.defaults.headers.common['Authorization'] = '';
  delete apiClient.defaults.headers.common['Authorization'];

  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};
