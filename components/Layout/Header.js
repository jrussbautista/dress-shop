import { useState } from 'react';
import { IoMdCart, IoIosSearch } from 'react-icons/io';
import Link from 'next/link';
import { useCart } from '../../store/cart/cart.context';
import { useAuth } from '../../store/auth/auth.context';

export default () => {
  const { carts } = useCart();
  const { currentUser, logout } = useAuth();
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  return (
    <>
      <header className="header">
        <ul className="header-wrapper">
          <Link href="/">
            <a className="site-title">Dress</a>
          </Link>
          <ul className="header-right">
            <div className="search-container">
              <form className="search-form">
                <input type="text" className="search-input" />
                <button className="search-button">
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
                <span style={{ fontWeight: '300' }}> | </span>
                <Link href="/login">
                  <a>Log In</a>
                </Link>
              </li>
            )}
          </ul>
        </ul>
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

          .header-right span,
          .header-right a {
            display: flex;
            align-items: center;
            padding-left: 0.6rem;
            color: #3d3d3d;
          }

          .cart-num {
            width: 2.5rem;
            height: 2.5rem;
            position: absolute;
            top: -6px;
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
        `}
      </style>
    </>
  );
};
