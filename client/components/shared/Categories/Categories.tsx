import React from 'react';
import Link from 'next/link';
import { Category } from 'types';
import styles from './Categories.module.css';

interface Props {
  categories: Category[];
}

const Categories: React.FC<Props> = ({ categories }) => {
  return (
    <div>
      <div className={styles.categoryContainer}>
        {categories.map((category) => (
          <div className={styles.list} key={category._id}>
            <Link href={`/search?category=${category.name.toLowerCase()}`}>
              <a>
                <div
                  className={styles.categoryImg}
                  style={{
                    backgroundImage: `url(${category.imageURL})`,
                  }}
                ></div>
                <div className={styles.name}>{category.name}</div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
