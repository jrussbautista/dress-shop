import Link from 'next/link';

import { SignUpForm, GoogleLogin } from '@/components/auth';
import { Meta } from '@/components/core';
import { Heading } from '@/components/ui';
import styles from '@/styles/Auth.module.css';

const SignUp = () => {
  return (
    <>
      <Meta title="Sign Up" />
      <div className={styles.authContainer}>
        <Heading>Sign Up</Heading>
        <SignUpForm />
        <div className={styles.link}>
          Already have an account?
          <Link href="/login">
            <a className={`${styles.link} ${styles.linkText}`}> Log in your account.</a>
          </Link>
          <div className={styles.or}>
            <div className={styles.line} />
            <div className={styles.text}>or</div>
            <div className={styles.line} />
          </div>
        </div>
        <GoogleLogin />
      </div>
    </>
  );
};

export default SignUp;
