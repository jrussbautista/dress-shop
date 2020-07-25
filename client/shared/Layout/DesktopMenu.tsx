import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { IoMdCart, IoIosSearch } from 'react-icons/io';
import { useAuth, useCart } from '../../store';
import { capitalizeFirstLetter } from '../../utils/helpers';
import { Button } from '../Button';

interface Props {}

export const DesktopMenu: React.FC<Props> = () => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const [search, setSearch] = useState('');

  const { currentUser, logout } = useAuth();
  const { cartsNum } = useCart();

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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Router.push(`/search?keyword=${search}`);
  };

  return (
    <>
      <div className="desktop-menu header-item">
        <div className="search-container">
          <form className="search-form" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className="search-input"
              placeholder="Search Product..."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <button className="search-button" type="submit">
              <IoIosSearch size={30} />
            </button>
          </form>
        </div>
        <li>
          <Link href="/cart">
            <a>
              <IoMdCart size={30} />
              Cart
              {currentUser && cartsNum > 0 && (
                <div className="cart-num">{cartsNum}</div>
              )}
            </a>
          </Link>
        </li>
        {currentUser ? (
          <li ref={dropdownRef}>
            <div
              className="user"
              onClick={() => setIsOpenDropdown(!isOpenDropdown)}
            >
              {currentUser.imageURL ? (
                <img src={currentUser.imageURL} alt={currentUser.name} />
              ) : (
                <div className="user-text-container">
                  {capitalizeFirstLetter(currentUser.name)}
                </div>
              )}
            </div>
            {isOpenDropdown && (
              <ul className="dropdown">
                <li onClick={() => setIsOpenDropdown(false)}>
                  <Link href="/profile">
                    <a>My Profile </a>
                  </Link>
                </li>
                <li onClick={() => setIsOpenDropdown(false)}>
                  <Link href="/order">
                    <a>My orders</a>
                  </Link>
                </li>
                <li onClick={() => setIsOpenDropdown(false)}>
                  <Button
                    type="button"
                    title="Log Out"
                    onClick={logout}
                    style={{ width: '100%' }}
                  />
                </li>
              </ul>
            )}
          </li>
        ) : (
          <li ref={dropdownRef}>
            <Link href="/signup">
              <a>Sign Up</a>
            </Link>
            <span style={{ fontWeight: 'normal', padding: '0 1rem' }}> | </span>
            <Link href="/login">
              <a>Log In</a>
            </Link>
          </li>
        )}
      </div>
      <style jsx>{`
        .header-item {
          display: flex;
          align-items: center;
        }

        .desktop-menu {
          display: none;
        }

        .header-item li {
          padding: 0 10px;
          display: flex;
          align-items: center;
          font-size: 1.7rem;
          position: relative;
        }

        .header-item span,
        .header-item a {
          display: flex;
          align-items: center;
          color: #3d3d3d;
        }

        .header-right a:hover {
          color: var(--color-primary);
        }

        .search-container {
          display: flex;
          align-items: center;
          padding: 0 2rem;
        }

        .search-button {
          background-color: transparent;
          border: 1px solid transparent;
          cursor: pointer;
        }

        .search-form {
          width: 30rem;
          display: flex;
          height: 5rem;
          border-radius: 5rem;
          padding: 0 1rem 0 2rem;
          background-color: var(--color-gray-dark);
        }

        .search-input {
          border: 1px solid transparent;
          width: 100%;
          font-size: 1.5rem;
          background-color: transparent;
        }

        .search-input:focus {
          outline: none;
        }

        .cart-num {
          width: 2.5rem;
          height: 2.5rem;
          position: absolute;
          top: -1.3rem;
          left: 3rem;
          background-color: var(--color-primary);
          color: #fff;
          font-size: 1.4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }

        .user {
          color: #fff;
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
          font-size: 1.6rem;
          font-weight: 600;
          cursor: pointer;
          overflow: hidden;
        }

        .user-text-container {
          background-color: var(--color-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }

        .user img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .icon-container svg {
          width: 2rem;
          height: 2rem;
        }

        .dropdown {
          width: 20rem;
          border: 1px solid rgba(0, 0, 0, 0.09);
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 1rem;
          background-color: #fff;
          border-radius: 6px;
          padding: 1rem;
        }

        .dropdown li:not(:last-child) {
          border-bottom: 1px solid #ccc;
        }

        .dropdown li:last-child {
          padding: 0.8rem 0;
        }

        .dropdown li a {
          padding: 0.8rem 0;
          width: 100%;
        }

        .dropdown li span {
          font-size: 2rem;
        }

        .dropdown li:last-child {
          border-top: 1px solid #eee;
        }

        @media only screen and (min-width: 1024px) {
          .desktop-menu {
            display: flex;
          }
        }
      `}</style>
    </>
  );
};
