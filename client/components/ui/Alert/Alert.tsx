import cName from 'classnames';
import React from 'react';

import styles from './Alert.module.css';

interface Props {
  type: 'error' | 'success';
  message: string | null;
}

const Alert = ({ type, message }: Props) => {
  const rootClassName = cName(styles.alert, styles[type]);

  return (
    <>
      <div className={rootClassName} role="alert">
        {message}
      </div>
    </>
  );
};

export default Alert;
