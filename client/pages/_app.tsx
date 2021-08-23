import { AppProps } from 'next/app';
import React from 'react';
import { SWRConfig } from 'swr';

import Layout from '@/components/core/Layout';
import { AppProviders } from '@/contexts';
import { User } from '@/types';
import '@/styles/global.css';

interface MyAppProps extends AppProps {
  currentUser: User | null;
}

const MyApp = ({ Component, pageProps }: MyAppProps): JSX.Element => {
  return (
    <SWRConfig value={{ revalidateOnFocus: false }}>
      <AppProviders>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProviders>
    </SWRConfig>
  );
};

export default MyApp;
