import React from 'react';
import Link from 'next/link';
import DesktopMenu from '../DesktopMenu';
import MobileMenu from '../MobileMenu';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <>
      <header className={styles.header}>
        <ul className={styles.headerWrapper}>
          <Link href="/">
            <a className={styles.siteTitle}>Dress</a>
          </Link>
          <div className={styles.headerRight}>
            <DesktopMenu />
            <MobileMenu />
          </div>
        </ul>
      </header>
    </>
  );
};

export default Header;
