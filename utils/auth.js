import Router from 'next/router';
import cookie from 'js-cookie';
import { parseCookies } from 'nookies';

// handle auto login when created an account, and login
function autoLogin(token, location) {
  cookie.set('token', token);
  Router.push(location);
}

function redirectUser(ctx, location) {
  if (ctx.req) {
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
    const token = cookie.get('token');
    if (token) redirectUser(ctx, '/');
  }
}

export { autoLogin, redirectUser, checkToken };
