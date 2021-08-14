import Link from 'next/link';
import React from 'react';

import styles from './Categories.module.css';

import { Category } from '@/types';

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
