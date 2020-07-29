import Router from "next/router";
import { setCookie } from "nookies";
import { NextPageContext } from "next";
import axios from "axios";

// handle auto login when created an account, and login
export const autoLogin = (token: string, location: string) => {
  setCookie({}, "token", token, {});
  Router.push(location);
};

export const redirectUser = (ctx: NextPageContext, location: string) => {
  if (ctx.req && ctx.res) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
};

export const protectedRoutes = (pathname: string) => {
  const protectedRoutes = ["/profile", "/checkout", "/order"];

  if (protectedRoutes.includes(pathname)) {
    return true;
  }

  return false;
};

export const checkProtectedRoutes = (ctx: NextPageContext) => {
  const isProtectedRoutes = protectedRoutes(ctx.pathname);
  if (isProtectedRoutes) {
    redirectUser(ctx, "/auth?type=login");
  }
};

export const setAuthToken = (token: string) => {
  axios.defaults.headers.common["Authorization"] = "";
  delete axios.defaults.headers.common["Authorization"];

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};
