import React from 'react';
import App, { AppProps, AppContext } from 'next/app';
import { StoreProvider } from 'store';
import { parseCookies, destroyCookie } from 'nookies';
import { checkProtectedRoutes } from 'utils/auth';
import { AuthService } from 'services/authService';
import { Layout } from 'shared';
import { User } from 'types';
import 'styles/global.css';

interface MyAppProps extends AppProps {
  currentUser: User | null;
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
  const appProps = await App.getInitialProps(appContext);
  const { token } = parseCookies(appContext.ctx);

  const isServer = appContext.ctx.req;
  const ctx = appContext.ctx;

  if (!token) {
    checkProtectedRoutes(ctx);
    return { ...appProps };
  }

  let currentUser: User | null = null;

  if (isServer) {
    try {
      const { user } = await AuthService.getMe(token);
      currentUser = user;
    } catch (error) {
      destroyCookie(ctx, 'token');
      checkProtectedRoutes(ctx);
    }
  }

  return { ...appProps, currentUser };
};

export default MyApp;
