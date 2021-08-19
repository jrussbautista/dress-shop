import React, { useState, useRef, useEffect } from 'react';
import { IoIosSearch } from 'react-icons/io';

import styles from './SearchBar.module.css';

interface Props {
  onSubmit(value: string): void;
  style?: React.CSSProperties;
  isFocus?: boolean;
}

const SearchBar = ({ onSubmit, style, isFocus }: Props) => {
  const [searchText, setSearchText] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocus) {
      if (searchRef.current) searchRef.current.focus();
    }
  }, [isFocus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchText.trim().length) return;
    onSubmit(searchText);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <form className={styles.searchForm} onSubmit={handleSubmit} style={style} role="search">
        <input
          ref={searchRef}
          type="text"
          className={styles.searchInput}
          placeholder="Search Product..."
          onChange={handleChange}
          value={searchText}
          aria-label="Search Product"
        />
        <button className={styles.searchButton} type="submit">
          <IoIosSearch size={30} />
        </button>
      </form>
    </>
  );
};

export default SearchBar;
