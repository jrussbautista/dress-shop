import React from 'react';
import App, { AppProps, AppContext } from 'next/app';
import { StoreProvider } from '../store';
import { parseCookies, destroyCookie } from 'nookies';
import { redirectUser } from '../utils/auth';
import { AuthService } from '../services/authService';
import { Layout } from '../shared';
import '../styles/global.css';

interface MyAppProps extends AppProps {
  currentUser: any;
}

const MyApp = ({ Component, pageProps, currentUser }: MyAppProps) => {
  return (
    <StoreProvider currentUser={currentUser}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  const { token } = parseCookies(appContext.ctx);

  const isServer = appContext.ctx.req;

  if (!token) {
    return { ...appProps };
  }

  let currentUser: any = {};

  if (isServer) {
    try {
      const { data } = await AuthService.getMe(token);
      currentUser = data.data.user;
    } catch (error) {
      destroyCookie(appContext.ctx, 'token');
      redirectUser(appContext.ctx, '/login');
    }
  }

  return { ...appProps, currentUser };
};

export default MyApp;
