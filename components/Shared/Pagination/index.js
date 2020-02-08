import React from 'react';
import Link from 'next/link';

const Pagination = ({ total, limit, activePage }) => {
  let pageNumbers = [];

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
          background-color: var(--color-dark);
          color: #fff;
          margin-right: 1rem;
        }

        .pagination .active {
          background-color: var(--color-primary);
        }

        .pagination li a,
        .pagination li span {
          color: #fff;
          padding: 1rem 2rem;
          display: block;
        }
      `}</style>
    </>
  );
};

export default Pagination;
