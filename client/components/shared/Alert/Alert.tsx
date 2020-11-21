import React from 'react';
import styles from './Alert.module.css';

interface Props {
  type: string;
  message: string | null;
}

const Alert: React.FC<Props> = ({ type, message }) => {
  const alertStyles = `${styles.alert} ${styles.alert[type]}`;

  return (
    <>
      <div className={alertStyles} role={type}>
        {message}
      </div>
    </>
  );
};

export default Alert;
