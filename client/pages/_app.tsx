import { AppProps } from 'next/app';
import React from 'react';

import Layout from '@/components/core/Layout';
import { AppProviders } from '@/contexts';
import { User } from '@/types';
import '@/styles/global.css';

interface MyAppProps extends AppProps {
  currentUser: User | null;
}

const MyApp = ({ Component, pageProps }: MyAppProps): JSX.Element => {
  return (
    <AppProviders>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProviders>
  );
};

export default MyApp;
