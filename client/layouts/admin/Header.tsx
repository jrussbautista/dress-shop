import React from 'react';

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="site-title"> Dress </div>
        <div className="spacer"></div>
        <nav className="nav-right">
          <div>
            <a href="#" className="nav-link">
              Log Out
            </a>
          </div>
        </nav>
      </header>
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
          font-size: 2rem;
        }

        .nav-right {
          display: flex;
        }

        .nav-link {
          color: var(--color-light);
          padding: 0 1rem;
          font-size: 1.6rem;
        }

        .spacer {
          flex: 1;
        }
      `}</style>
    </>
  );
};

export default Header;
