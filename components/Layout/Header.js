import { useState } from 'react';
import { IoMdCart, IoIosSearch, IoIosClose } from 'react-icons/io';
import { AccountIcon } from '../../components/Shared/Icons';
import Link from 'next/link';
import { useCart } from '../../store/cart/cartContext';
import { useAuth } from '../../store/auth/authContext';
import Router from 'next/router';

export default () => {
  const { carts } = useCart();
  const { currentUser, logout } = useAuth();
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [search, setSearch] = useState('');

  const handleSearchSubmit = e => {
    e.preventDefault();
    Router.push(`/search?keyword=${search}`);
  };

  return (
    <>
      <header className="header">
        <ul className="header-wrapper">
          <Link href="/">
            <a className="site-title">Dress</a>
          </Link>
          <div className="header-right">
            <div className="desktop-menu header-item">
              <div className="search-container">
                <form className="search-form" onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    className="search-input"
                    onChange={e => setSearch(e.target.value)}
                    value={search}
                  />
                  <button className="search-button" type="submit">
                    {' '}
                    <IoIosSearch size={30} />{' '}
                  </button>
                </form>
              </div>
              <li>
                <Link href="/cart">
                  <a>
                    <IoMdCart size={30} />
                    Cart
                    {currentUser && carts.length > 0 && (
                      <div className="cart-num">{carts.length}</div>
                    )}
                  </a>
                </Link>
              </li>
              {currentUser ? (
                <li>
                  <div
                    className="user"
                    onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                  >
                    {' '}
                    {currentUser.name
                      .split(' ')[0]
                      .charAt(0)
                      .toUpperCase()}{' '}
                  </div>
                  {isOpenDropdown && (
                    <ul className="dropdown">
                      <li>
                        <span>{currentUser.name}</span>
                      </li>
                      {currentUser && currentUser.role === 'admin' && (
                        <li>
                          <Link href="/admin">
                            <a> Admin Home </a>
                          </Link>
                        </li>
                      )}
                      <li>
                        <Link href="/order">
                          <a>
                            <span> My orders </span>
                          </a>
                        </Link>
                      </li>
                      <li>
                        <button className="btn" onClick={logout}>
                          LOG OUT
                        </button>
                      </li>
                    </ul>
                  )}
                </li>
              ) : (
                <li>
                  <Link href="/signup">
                    <a>Sign Up</a>
                  </Link>
                  <span style={{ fontWeight: '300', padding: '0 1rem' }}>
                    {' '}
                    |{' '}
                  </span>
                  <Link href="/login">
                    <a>Log In</a>
                  </Link>
                </li>
              )}
            </div>
            <div className="header-mobile header-item">
              <button
                className="search-button"
                type="button"
                onClick={setIsOpenSearch.bind(this, true)}
              >
                <IoIosSearch size={30} />
              </button>
              <li>
                <Link href="/cart">
                  <a>
                    <IoMdCart size={30} />
                    {currentUser && carts.length > 0 && (
                      <div className="cart-num">{carts.length}</div>
                    )}
                  </a>
                </Link>
              </li>
              <li>
                {currentUser ? (
                  <>
                    <span
                      onClick={setIsOpenDropdown.bind(this, !isOpenDropdown)}
                    >
                      <AccountIcon />
                    </span>
                    {isOpenDropdown && (
                      <ul className="dropdown">
                        <li>
                          <span>{currentUser.name}</span>
                        </li>
                        {currentUser && currentUser.role === 'admin' && (
                          <li>
                            <Link href="/admin">
                              <a> Admin Home </a>
                            </Link>
                          </li>
                        )}
                        <li>
                          <Link href="/order">
                            <a>
                              <span> My orders </span>
                            </a>
                          </Link>
                        </li>
                        <li>
                          <button className="btn" onClick={logout}>
                            LOG OUT
                          </button>
                        </li>
                      </ul>
                    )}
                  </>
                ) : (
                  <Link href="/login">
                    <a>
                      <AccountIcon />
                    </a>
                  </Link>
                )}
              </li>
            </div>
          </div>
        </ul>
        <div className={`mobile-search ${isOpenSearch ? 'open' : ''}`}>
          <div className="close" onClick={setIsOpenSearch.bind(this, false)}>
            <IoIosClose size={60} />
          </div>
          <form>
            <input type="text" placeholder="Search Product..." />
            <button type="submit">Search</button>
          </form>
        </div>
      </header>
      <style jsx>
        {`
          .header {
            position: sticky;
            z-index: 99;
            top: 0;
            left: 0;
            background-color: #fff;
            box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.06);
          }
          .site-title {
            font-size: 3rem;
            font-weight: 600;
            color: #3d3d3d;
          }
          .header-wrapper {
            display: flex;
            align-items: center;
            max-width: 120rem;
            margin: 0 auto;
            height: 9rem;
            padding: 0 2rem;
          }

          .header-right {
            flex: 1;
            display: flex;
            justify-content: flex-end;
          }

          .header-right li {
            padding: 0 10px;
            display: flex;
            align-items: center;
            font-size: 1.7rem;
            position: relative;
          }

          .header-item {
            display: flex;
            align-items: center;
          }

          .header-right span,
          .header-right a {
            display: flex;
            align-items: center;
            color: #3d3d3d;
          }

          .header-right a:hover {
            color: var(--color-primary);
          }

          .cart-num {
            width: 2.5rem;
            height: 2.5rem;
            position: absolute;
            top: -1.2rem;
            left: 3.3rem;
            background-color: var(--color-primary);
            color: #fff;
            font-size: 1.4rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
          }

          .search-container {
            display: flex;
            align-items: center;
            padding: 0 2rem;
          }

          .search-form {
            border: 1px solid #d3d3d3;
            width: 30rem;
            display: flex;
            height: 5rem;
            border-radius: 5rem;
            padding: 0 1rem 0 2rem;
          }

          .search-input {
            border: 1px solid transparent;
            width: 100%;
            font-size: 1.5rem;
          }

          .search-input:focus {
            outline: none;
          }

          .search-button {
            background-color: transparent;
            border: 1px solid transparent;
            cursor: pointer;
          }

          .user {
            background-color: var(--color-dark);
            color: #fff;
            width: 4rem;
            height: 4rem;
            border-radius: 50%;
            font-size: 1.6rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }

          .btn {
            width: 100%;
            color: #fff;
            background-color: var(--color-dark);
            border: 1px solid var(--color-dark);
            padding: 1.5rem 0;
            display: block;
            font-size: 1.8rem;
            cursor: pointer;
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

          .dropdown li {
            padding: 0.8rem 0;
          }

          .dropdown li span {
            font-size: 2rem;
          }

          .dropdown li:last-child {
            border-top: 1px solid #eee;
          }

          .icon-container svg {
            width: 2rem;
            height: 2rem;
          }

          .header-mobile {
            display: none;
          }

          .mobile-search {
            position: fixed;
            z-index: 99;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            height: 100%;
            width: 100%;
            background-color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            transform: translateY(-100%);
            transition: all 0.5s ease;
          }

          .mobile-search.open {
            transform: translateY(0);
          }

          .mobile-search .close {
            position: absolute;
            top: 3rem;
            left: 50%;
            transform: translateX(-50%);
            cursor: pointer;
          }

          .mobile-search form {
            width: 80%;
            display: flex;
            flex-direction: column;
          }

          .mobile-search input {
            height: 6rem;
            border: 1px solid transparent;
            border-bottom: 1px solid var(--color-dark);
            font-size: 2rem;
          }

          .mobile-search input:focus {
            outline: none;
          }

          .mobile-search button {
            margin-top: 2rem;
            background-color: var(--color-dark);
            color: #fff;
            border: 1px solid transparent;
            height: 6rem;
            font-size: 2rem;
          }

          @media only screen and (max-width: 768px) {
            .desktop-menu {
              display: none;
            }

            .header-mobile {
              display: flex;
            }
          }
        `}
      </style>
    </>
  );
};
