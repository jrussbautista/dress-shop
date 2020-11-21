import React from 'react';
import styles from './SearchCategory.module.css';

interface Props {
  active: string;
  onChangeTab(active: string): void;
}

const SearchCategory: React.FC<Props> = ({ active, onChangeTab }) => {
  return (
    <>
      <div className={styles.tab}>
        <button
          type={styles.button}
          className={`${styles.list} ${active === 'men' ? styles.active : ''}`}
          onClick={() => onChangeTab('men')}
        >
          Men
        </button>
        <button
          type={styles.button}
          className={`${styles.list} ${active === 'women' ? styles.active : ''}`}
          onClick={() => onChangeTab('women')}
        >
          Women
        </button>
      </div>
    </>
  );
};

export default SearchCategory;
