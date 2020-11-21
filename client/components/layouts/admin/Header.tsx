import React, { useState, useEffect } from 'react';
import { FiMenu } from 'react-icons/fi';
import { useRouter } from 'next/router';
import Sidebar from './Sidebar';
import { useAuth } from 'contexts';

const Header: React.FC = () => {
  const { query } = useRouter();
  const { logout, isAuthenticated } = useAuth();

  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const selectedPage = query.selected_page;

  const mobileSideNavClass = isOpenSidebar ? 'side-nav is-open' : 'side-nav';

  useEffect(() => {
    if (isOpenSidebar) {
      setIsOpenSidebar(false);
    }
  }, [selectedPage]);

  const toggleSideBar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  const onLogOut = () => {
    logout('/admin/login');
  };

  return (
    <>
      <header className="header">
        <button className="mobile-menu" onClick={toggleSideBar}>
          <FiMenu />
        </button>
        <div className="site-title"> Dress </div>
        <div className="spacer"></div>
        <nav className="nav-right">
          {isAuthenticated && (
            <button type="button" onClick={onLogOut} className="nav-link">
              Log Out
            </button>
          )}
        </nav>
      </header>
      <div className="mobile-side-bar">
        <div className={mobileSideNavClass}>
          <Sidebar />
        </div>
        {isOpenSidebar && (
          <div
            className="overlay"
            onClick={toggleSideBar}
            role="button"
            onKeyDown={toggleSideBar}
            tabIndex={-1}
          ></div>
        )}
      </div>

      <style jsx>{`
        .header {
          display: flex;
          align-items: center;
          background-color: var(--color-dark);
          color: var(--color-light);
          height: 7rem;
          padding: 0 2rem;
        }

        .site-title {
          font-size: 2.5rem;
        }

        .nav-right {
          display: flex;
        }

        .nav-link {
          color: var(--color-light);
          padding: 0 1rem;
          font-size: 1.7rem;
          background-color: transparent;
          border: 1px solid transparent;
        }

        .spacer {
          flex: 1;
        }

        .mobile-menu {
          background-color: transparent;
          border: 1px solid transparent;
          cursor: pointer;
          font-size: 2.5rem;
          color: #fff;
        }

        .side-nav {
          height: 100%;
          width: 20rem;
          transform: translateX(-100%);
          transition: 0.3s ease;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 2;
        }

        .is-open {
          transform: translateX(0);
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1;
        }

        @media only screen and (min-width: 768px) {
          .mobile-menu {
            display: none;
          }

          .mobile-side-bar {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
