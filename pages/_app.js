import React from 'react';
import App from 'next/app';
import { AuthProvider } from '../store/auth/auth.context';
import { CartProvider } from '../store/cart/cart.context';
import { parseCookies, destroyCookie } from 'nookies';
import axios from 'axios';
import baseURL from '../utils/baseURL';
import { redirectUser } from '../utils/auth';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { token } = parseCookies(ctx);

    let pageProps = {},
      currentUser = null;

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    if (token) {
      try {
        // verify token if its valid
        const payload = { headers: { authorization: token } };
        const response = await axios.get(`${baseURL}/api/account`, payload);
        const user = response.data;
        const isAdmin = user.role === 'admin';
        const isNotPermitted = !isAdmin && ctx.pathname === '/admin';
        if (isNotPermitted) {
          redirectUser(ctx, '/');
        }
        currentUser = user;
      } catch (error) {
        destroyCookie(ctx, 'token');
        redirectUser(ctx, '/login');
      }
    } else {
      const isProtectedRoute = ctx.pathname === '/account';
      if (isProtectedRoute) redirectUser(ctx, '/login');
    }

    return { ...pageProps, currentUser };
  }

  componentDidMount() {
    window.addEventListener('storage', this.synLogout);
  }

  //refresh page when logout
  synLogout = event => {
    if (event.key === 'logout') {
      window.location.href = '/login';
    }
  };

  render() {
    const { Component, pageProps, currentUser } = this.props;

    return (
      <AuthProvider currentUser={currentUser}>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </AuthProvider>
    );
  }
}

export default MyApp;
