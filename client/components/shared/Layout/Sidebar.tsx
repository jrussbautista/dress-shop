import React from 'react';
import Link from 'next/link';
import { Button } from '../Button';
import { useAuth } from 'store';

interface Props {
  isOpen: boolean;
  onClose(): void;
}

export const Sidebar: React.FC<Props> = ({ isOpen, onClose }) => {
  const { logout, currentUser } = useAuth();

  const handleClose = () => {
    onClose();
  };

  const handleLogOut = () => {
    logout();
    onClose();
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? 'isOpen' : ''}`}>
        <div className="title">
          <span> Dress </span>
        </div>
        <div
          className="list"
          role="link"
          tabIndex={-1}
          onClick={handleClose}
          onKeyDown={handleClose}
        >
          <Link href="/">
            <a className="link">Home</a>
          </Link>
        </div>
        <div className="title">
          <span> Categories </span>
        </div>
        <div
          className="list"
          role="link"
          tabIndex={-1}
          onClick={handleClose}
          onKeyDown={handleClose}
        >
          <Link href="/search?category=men">
            <a className="link">Men</a>
          </Link>
        </div>
        <div
          className="list"
          role="link"
          tabIndex={-1}
          onClick={handleClose}
          onKeyDown={handleClose}
        >
          <Link href="/search?category=women">
            <a className="link">Women</a>
          </Link>
        </div>
        {currentUser && (
          <div className="list">
            <Button
              type="button"
              onClick={handleLogOut}
              title="Log Out"
              style={{ width: '100%' }}
            />
          </div>
        )}
      </div>

      {isOpen && (
        <div
          className="overlay"
          role="button"
          tabIndex={-1}
          onClick={onClose}
          onKeyDown={onClose}
        ></div>
      )}
      <style jsx>{`
        .sidebar {
          width: 40%;
          position: fixed;
          top: 0;
          right: 0;
          background-color: #fff;
          height: 100%;
          z-index: 100;
          transform: translateX(100%);
          transition: 0.3s ease;
        }

        .title {
          padding: 1rem 2rem;
          font-size: 2.2rem;
          font-weight: 600;
        }

        .list {
          padding: 2rem;
        }

        .list:not(:last-child) {
          border-bottom: 1px solid #ccc;
        }

        .link {
          font-size: 1.7rem;
        }

        .isOpen {
          transform: translateX(0);
        }

        .overlay {
          background-color: rgba(0, 0, 0, 0.5);
          width: 100%;
          height: 100%;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 99;
        }
      `}</style>
    </>
  );
};
