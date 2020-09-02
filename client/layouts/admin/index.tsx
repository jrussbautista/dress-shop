import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Sidebar from './Sidebar';

export const AdminLayout: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>Dress Shop | Admin </title>
        <meta property="og:title" content="Dress Shop | Admin" key="title" />
      </Head>
      <Header />
      <main>
        <div className="wrapper">
          <Sidebar />
          <div className="main-content">{children}</div>
        </div>
      </main>
      <style jsx>{`
        .wrapper {
          display: flex;
          min-height: calc(100vh - 7rem);
        }

        .main-content {
          flex: 1;
          padding: 1rem;
        }
      `}</style>
    </>
  );
};
