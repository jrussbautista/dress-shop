import Head from 'next/head';
import NProgress from 'nprogress';
import Header from './Header';
import Router from 'next/router';
import GlobalStyle from './GlobalStyle';

NProgress.configure({ showSpinner: false });

Router.onRouteChangeStart = url => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

export default ({ children, title = 'Dress Shop' }) => {
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
