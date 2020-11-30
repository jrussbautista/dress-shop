import React from 'react';
import App, { AppProps, AppContext } from 'next/app';
import { StoreProvider } from 'contexts';
import { parseCookies, destroyCookie } from 'nookies';
import { checkProtectedRoutes } from 'utils/auth';
import { AuthService } from 'services/authService';
import MainLayout from 'components/layouts/main-layout';
import AdminLayout from 'components/layouts/admin-layout';
import { User } from 'types';
import 'styles/global.css';

interface MyAppProps extends AppProps {
  currentUser: User | null;
}

const MyApp = ({ Component, pageProps, currentUser, router }: MyAppProps): JSX.Element => {
  if (router.pathname.startsWith('/admin')) {
    return (
      <StoreProvider currentUser={currentUser}>
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      </StoreProvider>
    );
  }

  return (
    <StoreProvider currentUser={currentUser}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
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
