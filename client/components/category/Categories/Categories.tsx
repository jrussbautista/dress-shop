import Link from 'next/link';
import React from 'react';

import { Category } from '@/types';

import styles from './Categories.module.css';

interface Props {
  categories: Category[];
}

const Categories = ({ categories }: Props) => {
  return (
    <ul className={styles.categoryContainer}>
      {categories.map((category) => (
        <li className={styles.list} key={category._id}>
          <Link href={`/search?category=${category.name.toLowerCase()}`}>
            <a>
              <img className={styles.categoryImg} alt={category.name} src={category.imageURL}></img>
              <div className={styles.name}>{category.name}</div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Categories;
