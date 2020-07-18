import Router from 'next/router';
import { setCookie, parseCookies } from 'nookies';
import { NextPageContext } from 'next';

// handle auto login when created an account, and login
function autoLogin(token: string, location: string) {
  setCookie({}, 'token', token, {});
  Router.push(location);
}

function redirectUser(ctx: NextPageContext, location: string) {
  if (ctx.req && ctx.res) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
}

function checkToken(ctx) {
  if (ctx.req) {
    const { token } = parseCookies(ctx);
    if (token) redirectUser(ctx, '/');
  } else {
    const token = parseCookies({}, 'token');
    if (token) redirectUser(ctx, '/');
  }
}

export { autoLogin, redirectUser, checkToken };
