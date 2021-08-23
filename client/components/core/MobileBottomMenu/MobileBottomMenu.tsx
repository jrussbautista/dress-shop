import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FiHome, FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi';

import useCart from '@/hooks/cart/use-cart';
import useUser from '@/hooks/user/use-user';

import styles from './MobileBottomMenu.module.css';

const MobileBottomMenu = () => {
  const { pathname } = useRouter();
  const { data: currentUser } = useUser();

  const { data } = useCart();

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
                {data && data.items.length > 0 && (
                  <span className={styles.cartNum}>{data.items.length}</span>
                )}
              </div>
              <span className={styles.title}> Cart </span>
            </a>
          </Link>
        </div>
        <div className={`${styles.list} ${pathname === '/profile' ? 'active' : ''}`}>
          <Link href={`${currentUser ? '/profile' : '/login'}`}>
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
