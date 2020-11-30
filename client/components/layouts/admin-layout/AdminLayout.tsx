import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Sidebar from './Sidebar/Sidebar';
import { useAuth } from 'contexts';
import styles from './AdminLayout.module.css';

const AdminLayout: React.FC = ({ children }) => {
  const { currentUser } = useAuth();

  return (
    <>
      <Head>
        <title>Dress Shop | Admin </title>
        <meta property="og:title" content="Dress Shop | Admin" key="title" />
      </Head>
      <Header />
      <main>
        <div className={styles.wrapper}>
          {currentUser && currentUser.role === 'admin' && (
            <div className={styles.sidebar}>
              <Sidebar />
            </div>
          )}
          <div className={styles.mainContent}>{children}</div>
        </div>
      </main>
    </>
  );
};

export default AdminLayout;
