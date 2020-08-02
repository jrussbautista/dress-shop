import React from 'react';
import { useRouter } from 'next/router';
import { FiHome, FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi';
import Link from 'next/link';
import { useAuth, useCart } from 'store';

export const MobileBottomMenu: React.FC = () => {
  const { pathname } = useRouter();
  const { currentUser } = useAuth();
  const { cartsNum } = useCart();

  return (
    <>
      <div className="bottom-menu">
        <div className={`list ${pathname === '/' ? 'active' : ''}`}>
          <Link href="/">
            <a className="link">
              <div className="icon">
                <FiHome />
              </div>
              <span className="title"> Home </span>
            </a>
          </Link>
        </div>
        <div className={`list ${pathname === '/search' ? 'active' : ''}`}>
          <Link href="/search">
            <a className="link">
              <div className="icon">
                <FiSearch />
              </div>
              <span className="title"> Search </span>
            </a>
          </Link>
        </div>
        <div className={`list ${pathname === '/cart' ? 'active' : ''}`}>
          <Link href="/cart">
            <a className="link">
              <div className="icon">
                <FiShoppingCart />
                {cartsNum > 0 && <span className="cart-num">{cartsNum}</span>}
              </div>
              <span className="title"> Cart </span>
            </a>
          </Link>
        </div>
        <div className={`list ${pathname === '/profile' ? 'active' : ''}`}>
          <Link href={`${currentUser ? '/profile' : '/auth?type=login'}`}>
            <a className="link">
              <div className="icon">
                <FiUser />
              </div>
              <span className="title"> Profile </span>
            </a>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .bottom-menu {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: #fff;
          z-index: 9;
          padding: 1rem;
          display: flex;
          align-items: center;
          border-top: 1px solid #ccc;
        }

        .list {
          flex: 1;
        }

        .active {
          color: var(--color-primary);
        }

        .link {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          color: inherit;
        }

        .icon {
          font-size: 2.5rem;
          position: relative;
        }

        .title {
          font-size: 1.5rem;
        }

        .cart-num {
          width: 2.5rem;
          height: 2.5rem;
          position: absolute;
          top: -4px;
          right: -2rem;
          background-color: var(--color-primary);
          color: #fff;
          font-size: 1.4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }

        @media only screen and (min-width: 1024px) {
          .bottom-menu {
            display: none;
          }
        }
      `}</style>
    </>
  );
};
