import React from 'react';

import { Spinner } from '@/components/ui';

import styles from './PageLoader.module.css';

const PageLoader = () => {
  return (
    <>
      <div className={styles.pageLoader}>
        <Spinner color="#3d3d3d" size={30} />
      </div>
    </>
  );
};

export default PageLoader;
