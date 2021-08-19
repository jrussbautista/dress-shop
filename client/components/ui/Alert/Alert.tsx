import React from 'react';

import styles from './Alert.module.css';

interface Props {
  type: string;
  message: string | null;
}

const Alert = ({ type, message }: Props) => {
  const alertStyles = `${styles.alert} ${styles.alert[type]}`;

  return (
    <>
      <div className={alertStyles} role="alert">
        {message}
      </div>
    </>
  );
};

export default Alert;
