import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Sidebar from './Sidebar';
import { useAuth } from 'store';

export const AdminLayout: React.FC = ({ children }) => {
  const { currentUser } = useAuth();

  console.log(currentUser);

  return (
    <>
      <Head>
        <title>Dress Shop | Admin </title>
        <meta property="og:title" content="Dress Shop | Admin" key="title" />
      </Head>
      <Header />
      <main>
        <div className="wrapper">
          {currentUser && currentUser.role === 'admin' && (
            <div className="sidebar">
              <Sidebar />
            </div>
          )}
          <div className="main-content">{children}</div>
        </div>
      </main>
      <style jsx>{`
        .wrapper {
          height: calc(100vh - 7rem);
          display: flex;
        }
        .sidebar {
          display: none;
          height: 100%;
        }

        .main-content {
          flex: 1;
          padding: 2rem;
          overflow-y: auto;
        }

        @media only screen and (min-width: 768px) {
          .sidebar {
            display: block;
          }
        }
      `}</style>
    </>
  );
};
