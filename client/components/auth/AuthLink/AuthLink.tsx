import React from 'react';
import Link from 'next/link';
import styles from './AuthLink.module.css';

interface Props {
  type: string;
}

const AuthLink: React.FC<Props> = ({ type }) => {
  return (
    <>
      {type === 'login' ? (
        <div className={styles.link}>
          Don{`'`}t have an account?
          <Link href="/auth?type=register">
            <a className={`${styles.link} ${styles.linkText}`}> Create an account.</a>
          </Link>
        </div>
      ) : (
        <div className={styles.link}>
          Already have an account?
          <Link href="/auth?type=login">
            <a className={`${styles.link} ${styles.linkText}`}> Login your account.</a>
          </Link>
        </div>
      )}
    </>
  );
};

export default AuthLink;
