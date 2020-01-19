import Router from 'next/router';
import cookie from 'js-cookie';

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
    Router.push('location');
  }
}

export { autoLogin, redirectUser };
