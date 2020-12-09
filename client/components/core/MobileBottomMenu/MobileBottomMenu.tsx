import React from 'react';
import { useRouter } from 'next/router';
import { FiHome, FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi';
import Link from 'next/link';
import { useAuth, useCart } from 'contexts';
import styles from './MobileBottomMenu.module.css';

const MobileBottomMenu: React.FC = () => {
  const { pathname } = useRouter();
  const { currentUser } = useAuth();
  const { cartsNum } = useCart();

  return (
    <>
      <div className={styles.bottomMenu}>
        <div className={`${styles.list} ${pathname === '/' ? styles.active : ''}`}>
          <Link href="/">
            <a className={styles.link}>
              <div className={styles.icon}>
                <FiHome />
              </div>
              <span className={styles.title}> Home </span>
            </a>
          </Link>
        </div>
        <div className={`${styles.list} ${pathname === '/search' ? styles.active : ''}`}>
          <Link href="/search">
            <a className={styles.link}>
              <div className={styles.icon}>
                <FiSearch />
              </div>
              <span className={styles.title}> Search </span>
            </a>
          </Link>
        </div>
        <div className={`${styles.list} ${pathname === '/cart' ? styles.active : ''}`}>
          <Link href="/cart">
            <a className={styles.link}>
              <div className={styles.icon}>
                <FiShoppingCart />
                {cartsNum > 0 && <span className={styles.cartNum}>{cartsNum}</span>}
              </div>
              <span className={styles.title}> Cart </span>
            </a>
          </Link>
        </div>
        <div className={`list ${pathname === '/profile' ? 'active' : ''}`}>
          <Link href={`${currentUser ? '/profile' : '/auth?type=login'}`}>
            <a className={styles.link}>
              <div className={styles.icon}>
                <FiUser />
              </div>
              <span className={styles.title}> Profile </span>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MobileBottomMenu;
