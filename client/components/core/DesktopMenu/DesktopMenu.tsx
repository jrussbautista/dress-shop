import { useTheme } from 'next-themes';
import Link from 'next/link';
import Router from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { IoMdCart } from 'react-icons/io';

import { SearchBar } from '@/components/core';
import { Button } from '@/components/ui';
import { useAuth, useCart } from '@/contexts';
import { capitalizeFirstLetter } from '@/utils/helpers';

import styles from './DesktopMenu.module.css';

const DesktopMenu: React.FC = () => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  const { currentUser, logout } = useAuth();
  const { cartItems } = useCart();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    window.addEventListener('click', handleClickOutSide);
  }, []);

  const handleClickOutSide = (e: Event) => {
    const target = e.target;
    if (target instanceof Node && dropdownRef.current?.contains(target)) {
      return;
    }

    setIsOpenDropdown(false);
  };

  const onLogOut = () => {
    logout('/auth?type=login');
  };

  const handleSearchSubmit = (searchText: string) => {
    Router.push(`/search?keyword=${searchText}`);
  };

  const handleCloseDropDown = () => {
    setIsOpenDropdown(!isOpenDropdown);
  };

  const handleToggleTheme = () => {
    const selectedTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(selectedTheme);
  };

  return (
    <>
      <div className={`${styles.desktopMenu} ${styles.headerItem}`}>
        <div className={styles.searchContainer}>
          <SearchBar onSubmit={handleSearchSubmit} />
        </div>
        <li>
          <Link href="/cart">
            <a>
              <IoMdCart size={30} />
              Cart
              {currentUser && cartItems.length > 0 && (
                <div className={styles.cartNum}>{cartItems.length}</div>
              )}
            </a>
          </Link>
        </li>
        {currentUser ? (
          <li ref={dropdownRef}>
            <div
              role="button"
              tabIndex={-1}
              className={styles.user}
              onClick={handleCloseDropDown}
              onKeyDown={handleCloseDropDown}
            >
              {currentUser.imageURL ? (
                <img src={currentUser.imageURL} alt={currentUser.name} />
              ) : (
                <div className={styles.userTextContainer}>
                  {capitalizeFirstLetter(currentUser.name)}
                </div>
              )}
            </div>

            {isOpenDropdown && (
              <div className={styles.dropdown}>
                <div
                  role="link"
                  className={styles.item}
                  tabIndex={-1}
                  onClick={handleCloseDropDown}
                  onKeyDown={handleCloseDropDown}
                >
                  <Link href="/profile">
                    <a>My Profile </a>
                  </Link>
                </div>
                <div
                  role="link"
                  tabIndex={-1}
                  className={styles.item}
                  onClick={handleCloseDropDown}
                  onKeyDown={handleCloseDropDown}
                >
                  <Link href="/orders">
                    <a>My Orders</a>
                  </Link>
                </div>

                <div
                  role="link"
                  tabIndex={-1}
                  className={styles.item}
                  onClick={handleCloseDropDown}
                  onKeyDown={handleCloseDropDown}
                >
                  <Link href="/wishlist">
                    <a>My Wishlist</a>
                  </Link>
                </div>

                <div
                  className={styles.item}
                  role="button"
                  tabIndex={-1}
                  onClick={handleToggleTheme}
                  onKeyPress={handleToggleTheme}
                >
                  <div className={styles.selectThemeContainer}>
                    <span>Theme</span>
                    <span>{theme === 'light' ? <FiSun /> : <FiMoon />}</span>
                  </div>
                </div>

                <div className={styles.item}>
                  <Button
                    type="button"
                    title="Log Out"
                    onClick={onLogOut}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            )}
          </li>
        ) : (
          <li ref={dropdownRef}>
            <Link href="/auth?type=register">
              <a>Sign Up</a>
            </Link>
            <span className={styles.line}> | </span>
            <Link href="/auth?type=login">
              <a>Log In</a>
            </Link>
          </li>
        )}
      </div>
    </>
  );
};

export default DesktopMenu;
