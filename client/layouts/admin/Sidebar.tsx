import React from 'react';

const Sidebar = () => {
  return (
    <>
      <aside className="sidebar">
        <ul className="sidebar-list">
          <li> Dashboard</li>
          <li>Users</li>
          <li>Products</li>
        </ul>
      </aside>
      <style jsx>{`
        .sidebar {
          background-color: #fff;
          width: 20rem;
          box-shadow: 0 0 2rem 0 rgba(136, 152, 170, 0.15);
        }

        .sidebar-list li {
          display: block;
          padding: 10px;
          font-size: 1.6rem;
        }
      `}</style>
    </>
  );
};

export default Sidebar;
