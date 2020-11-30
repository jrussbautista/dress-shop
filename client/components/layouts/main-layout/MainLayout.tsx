import React from 'react';
import { useEffect } from 'react';
import Head from 'next/head';
import NProgress from 'nprogress';
import Header from './Header';
import Router from 'next/router';
import { initGA, logPageView } from 'utils/analytics';
import styles from './MainLayout.module.css';

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});

Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});

Router.events.on('routeChangeError', () => {
  NProgress.done();
});

interface Props {
  title?: string;
}

const MainLayout: React.FC<Props> = ({ children, title = 'Dress Shop' }) => {
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="title" />
      </Head>
      <Header />
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default MainLayout;
