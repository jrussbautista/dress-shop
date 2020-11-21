import React, { useState } from 'react';
import { MdExpandMore } from 'react-icons/md';
import styles from './SearchFilter.module.css';

interface Props {
  handleChange(selected: string): void;
  active: string;
}

const SearchFilter: React.FC<Props> = ({ handleChange, active }) => {
  const [selected, setSelected] = useState(!active ? null : getActive(active));
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleDropdown = (val: string) => {
    handleChange(val);
    setOpenDropdown(false);
    setSelected(getActive(val));
  };

  function getActive(active: string) {
    return active === 'price' ? 'Price:  Low to High' : 'Price:  High to Low';
  }

  return (
    <div className={styles.filterContainer}>
      <span className="label"> Sort by </span>
      <div className={styles.select}>
        <button
          className={styles.selectItem}
          onClick={() => setOpenDropdown(!openDropdown)}
          type="button"
        >
          <span>{!selected ? 'Price' : selected}</span>
          <span>
            <MdExpandMore size={24} />
          </span>
        </button>
        {openDropdown && (
          <div className={styles.dropdown}>
            <button className={styles.item} type="button" onClick={() => handleDropdown('price')}>
              Low to High
            </button>
            <button className={styles.item} type="button" onClick={() => handleDropdown('-price')}>
              High to Low
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
