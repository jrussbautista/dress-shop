import React from 'react';

interface Props {
  total: number;
  limit: number;
  active: number;
  onChange(val: number): void;
}

export const Pagination: React.FC<Props> = ({ total, limit, active, onChange }) => {
  let pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(total / limit); i++) {
    pageNumbers = [...pageNumbers, i];
  }

  return (
    <>
      <ul className="pagination">
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
      <style jsx>{`
        .pagination {
          display: flex;
          padding: 2rem 0;
          align-items: center;
          justify-content: center;
        }

        .pagination li {
          background-color: #fff;
          margin-right: 1rem;
          border-radius: var(--border-radius);
        }

        .pagination li button {
          background-color: transparent;
          border: 1px solid transparent;
          cursor: pointer;
        }

        .pagination .active {
          background-color: var(--color-dark);
        }

        .pagination li a,
        .pagination li span,
        .pagination button {
          color: var(--color-dark);
          padding: 1rem 2rem;
          display: block;
          font-size: 1.8rem;
        }

        .pagination .active span {
          color: #fff;
        }
      `}</style>
    </>
  );
};
