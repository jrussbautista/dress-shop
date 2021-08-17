import React from 'react';

import styles from './CategoriesSkeleton.module.css';

const CategoriesSkeleton: React.FC = () => {
  return (
    <div>
      <div className={styles.categoryContainer} aria-label="Categories loading">
        {[1, 2].map((category) => (
          <div className={styles.list} key={category}>
            <div className={styles.categoryImg} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSkeleton;
