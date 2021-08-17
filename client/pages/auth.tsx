import { useRouter } from 'next/router';
import React from 'react';

import { Login, SignUp, GoogleLogin, AuthLink } from '@/components/auth';
import { MobileBottomMenu } from '@/components/core';
import styles from '@/styles/Auth.module.css';

const Auth: React.FC = () => {
  const { query } = useRouter();
  const type = query.type as 'login' | 'register';

  const authElement = type === 'register' ? <SignUp /> : <Login />;

  return (
    <>
      <div className={styles.authContainer}>
        {authElement}
        <AuthLink type={type} />
        <div className={styles.or}>
          <span className={styles.line}></span>
          <span className={styles.text}>or</span>
          <span className={styles.line}></span>
        </div>
        <GoogleLogin />
      </div>
      <MobileBottomMenu />
    </>
  );
};

export default Auth;
