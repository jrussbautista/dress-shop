import React, { useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import Router from 'next/router';
import { Button } from '../Button';

interface Props {
  isOpenSearch: boolean;
  setIsOpenSearch(val: boolean): void;
}

export const MobileSearch: React.FC<Props> = ({
  isOpenSearch,
  setIsOpenSearch,
}) => {
  const [search, setSearch] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpenSearch(false);
    Router.push(`/search?keyword=${search}`);
  };

  return (
    <>
      <div className={`mobile-search ${isOpenSearch ? 'open' : ''}`}>
        <div className="close" onClick={() => setIsOpenSearch(false)}>
          <IoIosClose size={50} />
        </div>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search Product..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <Button type="submit" title="Search" style={{ marginTop: 20 }} />
        </form>
      </div>
      <style jsx>{`
        .mobile-search {
          position: fixed;
          z-index: 99;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          height: 100%;
          width: 100%;
          background-color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          transform: translateY(-100%);
          transition: all 0.5s ease;
        }

        .mobile-search.open {
          transform: translateY(0);
        }

        .mobile-search .close {
          position: absolute;
          bottom: 6rem;
          left: 50%;
          transform: translateX(-50%);
          cursor: pointer;
        }

        .mobile-search form {
          width: 80%;
          display: flex;
          flex-direction: column;
        }

        .mobile-search input {
          height: 6rem;
          border: 1px solid transparent;
          border-bottom: 1px solid var(--color-dark);
          font-size: 1.5rem;
        }

        .mobile-search input:focus {
          outline: none;
        }
      `}</style>
    </>
  );
};
