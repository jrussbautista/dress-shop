import React from 'react';

import styles from './PageLoader.module.css';

import { Spinner } from '@/components/ui';

const PageLoader: React.FC = () => {
  return (
    <>
      <div className={styles.pageLoader}>
        <Spinner color="#3d3d3d" size={30} />
      </div>
    </>
  );
};

export default PageLoader;
