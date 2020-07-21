import React, { useState } from 'react';
import { IoMdCart, IoIosSearch } from 'react-icons/io';
import { IconAccount } from '../Icons';
import { useAuth, useCart } from '../../store';
import Link from 'next/link';
import { MobileSearch } from './MobileSearch';

export const MobileMenu: React.FC = () => {
  const { currentUser } = useAuth();
  const { cartsNum } = useCart();

  const [isOpenSearch, setIsOpenSearch] = useState(false);

  return (
    <>
      <div className="header-mobile header-item">
        <button
          className="search-button"
          type="button"
          onClick={() => setIsOpenSearch(true)}
        >
          <IoIosSearch size={30} />
        </button>
        <li>
          <Link href="/cart">
            <a>
              <IoMdCart size={30} />
              {currentUser && cartsNum > 0 && (
                <div className="cart-num">{cartsNum}</div>
              )}
            </a>
          </Link>
        </li>
        <MobileSearch
          isOpenSearch={isOpenSearch}
          setIsOpenSearch={setIsOpenSearch}
        />
      </div>
      <style jsx>{`
        .header-item li {
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

        .header-item span,
        .header-item a {
          display: flex;
          align-items: center;
          color: #3d3d3d;
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

        .search-button {
          background-color: transparent;
          border: 1px solid transparent;
          cursor: pointer;
        }

        @media only screen and (min-width: 1024px) {
          .header-mobile {
            display: none;
          }
        }
      `}</style>
    </>
  );
};
