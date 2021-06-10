import React from 'react';
import { AppProps } from 'next/app';
import { StoreProvider } from 'contexts';
import { ThemeProvider } from 'next-themes';

import Layout from 'components/core/Layout';
import { User } from 'types';
import 'styles/global.css';

interface MyAppProps extends AppProps {
  currentUser: User | null;
}

const MyApp = ({ Component, pageProps }: MyAppProps): JSX.Element => {
  return (
    <StoreProvider>
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </StoreProvider>
  );
};

export default MyApp;
