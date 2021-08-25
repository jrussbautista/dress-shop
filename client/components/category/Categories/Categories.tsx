import Image from 'next/image';
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
              <div className={styles.categoryImgWrapper}>
                <Image alt={category.name} src={category.imageURL} layout="fill" />
              </div>
              <p className={styles.name}>{category.name}</p>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Categories;
