import React from 'react';
import Link from 'next/link';
import { DesktopMenu } from './DesktopMenu';
import { MobileMenu } from './MobileMenu';

const Header: React.FC = () => {
  return (
    <>
      <header className="header">
        <ul className="header-wrapper">
          <Link href="/">
            <a className="site-title">Dress</a>
          </Link>
          <div className="header-right">
            <DesktopMenu />
            <MobileMenu />
          </div>
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
            height: 8rem;
            padding: 0 2rem;
          }

          .header-right {
            flex: 1;
            display: flex;
            justify-content: flex-end;
          }
        `}
      </style>
    </>
  );
};

export default Header;
