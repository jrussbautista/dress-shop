import React from 'react';
import styles from './Spinner.module.css';

interface Props {
  color?: string;
  width: number;
  height: number;
}

const Spinner: React.FC<Props> = ({ color = 'var(--color-primary)', width = 20 }) => {
  return (
    <>
      <div className={styles.spinner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
};

export default Spinner;
