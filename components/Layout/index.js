import { useEffect } from 'react';
import Head from 'next/head';
import NProgress from 'nprogress';
import Header from './Header';
import Router from 'next/router';
import GlobalStyle from './GlobalStyle';
import PropTypes from 'prop-types';
import { initGA, logPageView } from '../../utils/analytics';

NProgress.configure({ showSpinner: false });

Router.onRouteChangeStart = url => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const Layout = ({ children, title = 'Dress Shop' }) => {
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
      </Head>
      <GlobalStyle />
      <Header />
      <main>{children}</main>
    </>
  );
};

Layout.propTypes = {
  title: PropTypes.string
};

export default Layout;
