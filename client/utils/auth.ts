import Router from 'next/router';
import { setCookie } from 'nookies';

// handle auto login when created an account, and login
export const autoLogin = (token: string, location: string): void => {
  setCookie({}, 'token', token, {});
  Router.push(location);
};
