import React, { useState, useEffect } from 'react';
import { FiMenu } from 'react-icons/fi';
import { useRouter } from 'next/router';
import Sidebar from '../Sidebar';
import { useAuth } from 'contexts';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const { query } = useRouter();
  const { logout, isAuthenticated } = useAuth();

  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const selectedPage = query.selected_page;

  const mobileSideNavClass = isOpenSidebar ? 'side-nav is-open' : 'side-nav';

  useEffect(() => {
    if (isOpenSidebar) {
      setIsOpenSidebar(false);
    }
  }, [selectedPage]);

  const toggleSideBar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  const onLogOut = () => {
    logout('/admin/login');
  };

  return (
    <>
      <header className={styles.header}>
        <button className={styles.mobileMenu} onClick={toggleSideBar}>
          <FiMenu />
        </button>
        <div className={styles.siteTitle}> Dress </div>
        <div className={styles.spacer}></div>
        <nav className={styles.navRight}>
          {isAuthenticated && (
            <button type="button" onClick={onLogOut} className={styles.navLink}>
              Log Out
            </button>
          )}
        </nav>
      </header>
      <div className={styles.mobileSideBar}>
        <div className={mobileSideNavClass}>
          <Sidebar />
        </div>
        {isOpenSidebar && (
          <div
            className={styles.overlay}
            onClick={toggleSideBar}
            role="button"
            onKeyDown={toggleSideBar}
            tabIndex={-1}
          ></div>
        )}
      </div>
    </>
  );
};

export default Header;
