import React from 'react';
import styles from './Pagination.module.css';

interface Props {
  total: number;
  limit: number;
  active: number;
  onChange(val: number): void;
}

const Pagination: React.FC<Props> = ({ total, limit, active, onChange }) => {
  let pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(total / limit); i++) {
    pageNumbers = [...pageNumbers, i];
  }

  return (
    <>
      <ul className={styles.pagination}>
        {pageNumbers.map((number, i) =>
          number === Number(active) ? (
            <li className={'active'} key={i}>
              <span>{number}</span>
            </li>
          ) : (
            <li key={i}>
              <button onClick={() => onChange(number)} type="button">
                {number}
              </button>
            </li>
          )
        )}
      </ul>
    </>
  );
};

export default Pagination;
