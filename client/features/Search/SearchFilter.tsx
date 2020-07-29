import React, { useState } from 'react';
import { MdExpandMore } from 'react-icons/md';

interface Props {
  handleChange(selected: string): void;
  active: string;
}

export const SearchFilter: React.FC<Props> = ({ handleChange, active }) => {
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
    <div className="filter-container">
      {' '}
      <span className="label"> Sort by </span>
      <div className="select">
        {' '}
        <div className="select-item" onClick={() => setOpenDropdown(!openDropdown)}>
          <span>{!selected ? 'Price' : selected}</span>
          <span>
            <MdExpandMore size={24} />
          </span>
        </div>
        {openDropdown && (
          <ul className="dropdown">
            <li onClick={() => handleDropdown('price')}> Low to High </li>
            <li onClick={() => handleDropdown('-price')}> High to Low </li>
          </ul>
        )}
      </div>
      <style jsx>{`
        .filter-container {
          display: flex;
          align-items: center;
        }

        .label {
          font-size: 1.8rem;
          padding-right: 1rem;
        }

        .select {
          border: 1px solid #eee;
          background: #fff;
          position: relative;
          font-size: 1.8rem;
          padding: 1rem 1rem;
          width: 21rem;
          cursor: pointer;
          border-radius: 6px;
        }

        .select-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .dropdown {
          position: absolute;
          top: 100%;
          margin-top: 1rem;
          left: 0;
          background-color: #fff;
          padding: 1rem;
          border-radius: 6px;
          z-index: 1;
          width: 20rem;
          border: 1px solid rgba(0, 0, 0, 0.09);
        }

        .dropdown li {
          font-size: 1.8rem;
          padding: 0.5rem 1rem;
        }

        .dropdown li:hover {
          color: var(--color-primary);
        }
      `}</style>
    </div>
  );
};
