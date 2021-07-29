import React from 'react';

import { colors } from '@/utils/theme';

import styles from './Spinner.module.css';

interface Props {
  color?: string;
  size: number;
}

const Spinner: React.FC<Props> = ({ color = colors.primary, size = 30 }) => {
  const sizeStyle = `${size}px`;

  return (
    <>
      <div
        className={styles.loader}
        style={{ width: sizeStyle, height: sizeStyle, borderLeftColor: color }}
      />
    </>
  );
};

export default Spinner;
