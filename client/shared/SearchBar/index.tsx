import React, { useState, useRef, useEffect } from 'react';
import { IoIosSearch } from 'react-icons/io';

interface Props {
  onSubmit(value: string): void;
  style?: React.CSSProperties;
  isFocus?: boolean;
}

export const SearchBar: React.FC<Props> = ({ onSubmit, style, isFocus }) => {
  const [searchText, setSearchText] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocus) {
      if (searchRef.current) searchRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(searchText);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <form className="search-form" onSubmit={handleSubmit} style={style}>
        <input
          ref={searchRef}
          type="text"
          className="search-input"
          placeholder="Search Product..."
          onChange={handleChange}
          value={searchText}
        />
        <button className="search-button" type="submit">
          <IoIosSearch size={30} />
        </button>
      </form>
      <style jsx>{`
        .search-button {
          background-color: transparent;
          border: 1px solid transparent;
          cursor: pointer;
        }

        .search-form {
          width: 30rem;
          display: flex;
          height: 5rem;
          border-radius: 5rem;
          padding: 0 1rem 0 2rem;
          background-color: var(--color-gray-dark);
        }

        .search-input {
          border: 1px solid transparent;
          width: 100%;
          font-size: 1.5rem;
          background-color: transparent;
        }

        .search-input:focus {
          outline: none;
        }
      `}</style>
    </>
  );
};
