import React from 'react';
import styles from './ProductListSkeleton.module.css';

interface Props {
  number: number;
}

const ProductListSkeleton: React.FC<Props> = ({ number }) => {
  return (
    <>
      <div className={styles.grid}>
        {[...Array(number)].map((_, i) => (
          <div key={i} className={styles.gridItem}>
            <div className={styles.gridBoxWrapper}>
              <div className={styles.gridBox}></div>
            </div>
            <div className={styles.info}>
              <div className={styles.line}></div>
              <div className={styles.halfLine}></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductListSkeleton;
