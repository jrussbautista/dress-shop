import React from 'react';
import { Spinner } from 'components/shared';
import styles from './PageLoader.module.css';

const PageLoader: React.FC = () => {
  return (
    <>
      <div className={styles.pageLoader}>
        <Spinner color="#3d3d3d" width={60} height={60} />
      </div>
    </>
  );
};

export default PageLoader;
