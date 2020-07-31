import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { Sidebar } from './Sidebar';

export const MobileMenu: React.FC = () => {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);

  return (
    <>
      <div className="header-mobile header-item">
        <button
          className="menu-button"
          type="button"
          onClick={() => setIsOpenSideBar(!isOpenSideBar)}
        >
          <FiMenu />
        </button>
        <Sidebar isOpen={isOpenSideBar} onClose={() => setIsOpenSideBar(false)} />
      </div>
      <style jsx>{`
        .header-item {
          display: flex;
          align-items: center;
        }

        .menu-button {
          background-color: transparent;
          border: 1px solid transparent;
          cursor: pointer;
          font-size: 2.5rem;
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
