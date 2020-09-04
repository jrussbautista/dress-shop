import React from 'react';
import Link from 'next/link';
import { Category } from 'types';

interface Props {
  categories: Category[];
}

export const HomeCategories: React.FC<Props> = ({ categories }) => {
  return (
    <div>
      <div className="category-container">
        {categories.map((category) => (
          <div className="list" key={category._id}>
            <Link href={`/search?category=${category.name.toLowerCase()}`}>
              <a>
                <div
                  className="category-img"
                  style={{
                    backgroundImage: `url(${category.imageURL})`,
                  }}
                ></div>
                <div className="name">{category.name}</div>
              </a>
            </Link>
          </div>
        ))}
      </div>

      <style jsx>{`
        .category-container {
          padding: 1.5rem 2rem 3rem 1.5rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
          grid-gap: 2rem;
        }

        .list {
          position: relative;
        }

        .name {
          position: absolute;
          top: 2rem;
          left: 2rem;
          font-size: 3rem;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--color-dark);
        }

        .category-img {
          width: 100%;
          height: 100%;
          padding-top: 56.25%;
          background-size: cover;
          border: 1px solid var(--color-gray-light);
        }
      `}</style>
    </div>
  );
};
