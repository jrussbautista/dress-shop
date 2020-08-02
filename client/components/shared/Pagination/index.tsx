import React from 'react';
import Link from 'next/link';

interface Props {
  total: number;
  limit: number;
  activePage: number;
}

export const Pagination: React.FC<Props> = ({ total, limit, activePage }) => {
  let pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(total / limit); i++) {
    pageNumbers = [...pageNumbers, i];
  }

  return (
    <>
      <ul className="pagination">
        {pageNumbers.map((number, i) =>
          number === Number(activePage) ? (
            <li className={'active'} key={i}>
              <span>{number}</span>
            </li>
          ) : (
            <li key={i}>
              <Link href={`/admin?page=${number}`}>
                <a>{number}</a>
              </Link>
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
          font-size: 1.8rem;
          background-color: #fff;
          margin-right: 1rem;
          border-radius: var(--border-radius);
        }

        .pagination .active {
          background-color: var(--color-primary);
        }

        .pagination li a,
        .pagination li span {
          color: var(--color-dark);
          padding: 1rem 2rem;
          display: block;
        }

        .pagination .active span {
          color: #fff;
        }
      `}</style>
    </>
  );
};
