import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar: React.FC = () => {
  const { query } = useRouter();
  const selectedPage = query.selected_page || 'dashboard';

  const isActive = (page: string): boolean => {
    return selectedPage === page;
  };

  return (
    <>
      <aside className="sidebar">
        <ul className="sidebar-list">
          <li className={`${isActive('dashboard') ? 'active' : ''}`}>
            <Link href="/admin?selected_page=dashboard">
              <a>Dashboard</a>
            </Link>
          </li>
          <li className={`${isActive('products') ? 'active' : ''}`}>
            <Link href="/admin?selected_page=products">
              <a>Products</a>
            </Link>
          </li>
          <li className={`${isActive('users') ? 'active' : ''}`}>
            <Link href="/admin?selected_page=users">
              <a>Users</a>
            </Link>
          </li>
        </ul>
      </aside>
      <style jsx>{`
        .sidebar {
          background-color: #fff;
          width: 20rem;
          box-shadow: 0 0 2rem 0 rgba(136, 152, 170, 0.15);
          height: 100%;
        }

        .sidebar-list li {
          display: block;
          padding: 1.5rem;
          font-size: 1.6rem;
        }

        .sidebar .active a {
          color: var(--color-primary);
        }
      `}</style>
    </>
  );
};

export default Sidebar;
